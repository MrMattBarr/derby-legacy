import { AVPlaybackStatus } from "expo-av";
import { getAuth, signInAnonymously } from "firebase/auth";
import { runInAction, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useAuth } from "../stores/AuthStore";
import { useUsers } from "../stores/UsersStore";
import Demo from "../types/Demo";
import useDemos from "./DemosContext";
import usePlayback, { PlayState } from "./PlaybackContext";
import useSpots from "./SpotsContext";

const ReactiveContext = React.createContext({});
export const ReactiveProvider = observer(({ children }: any) => {
  const firebaseAuth = getAuth();
  const authStore = useAuth();
  const userStore = useUsers();
  const { demos } = useDemos();
  const { spots } = useSpots();
  const { active } = usePlayback();
  const { demo, spot, status } = toJS(active);
  const generateAnonymousAuth = () => {
    signInAnonymously(firebaseAuth)
      .then(({ user }) => {
        authStore.login(user);
        userStore.loadUser(user.uid);
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  firebaseAuth.onAuthStateChanged((authUser) => {
    if (authUser) {
      authStore.login(authUser);
    } else {
      generateAnonymousAuth();
    }
  });

  interface IPlaybackStatus {
    playbackStatus: AVPlaybackStatus;
    demo: Demo;
  }
  const updatePlayable = ({ playbackStatus, demo }: IPlaybackStatus) => {
    runInAction(() => (active.playbackStatus = playbackStatus));
    if (!playbackStatus.isLoaded) {
      return false;
    }
    if (playbackStatus.didJustFinish) {
      let nextSpot: string | undefined = undefined;
      const currentSpotIndex = demo.spots.indexOf(active.spot || "");
      if (currentSpotIndex > -1) {
        nextSpot = demo.spots[currentSpotIndex + 1];
      }
      if (nextSpot) {
        runInAction(() => (active.spot = nextSpot));
      } else {
        runInAction(() => {
          active.status = PlayState.READY;
          active.spot = undefined;
          active.demo = undefined;
        });
      }
    }
  };

  const playDemo = (id: string) => {
    const jsDemo = toJS(demos[id]);
    if (!jsDemo) {
      return;
    }
    const { spots: spotIds } = jsDemo;
    runInAction(() => {
      active.spot = spotIds[0];
    });
  };

  const playActive = () => {
    if (demo && !spot) {
      playDemo(demo);
    }
    if (spot) {
      const { audio } = toJS(spots[spot]);
      if (!audio) {
        return;
      }
      if (status === PlayState.PLAYING) {
        audio?.setOnPlaybackStatusUpdate((playbackStatus: AVPlaybackStatus) =>
          updatePlayable({ demo: toJS(demos[demo ?? ""]), playbackStatus })
        );
        audio?.playAsync();
      } else if (status === PlayState.PAUSED) {
        audio?.pauseAsync();
      }
    }
  };

  useEffect(playActive, [demo, spot, status]);
  return (
    <ReactiveContext.Provider value={{}}>{children}</ReactiveContext.Provider>
  );
});
