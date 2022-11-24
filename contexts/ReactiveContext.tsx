import { AVPlaybackStatus } from "expo-av";
import { getAuth, signInAnonymously } from "firebase/auth";
import { runInAction, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useAuth } from "../stores/AuthStore";
import Demo from "../types/Demo";
import useDemos from "./DemosContext";
import usePlayback, { PlayState } from "./PlaybackContext";
import useSpots from "./SpotsContext";
import useUser from "./UserContext";

const ReactiveContext = React.createContext({});
export const ReactiveProvider = observer(({ children }: any) => {
  const auth = getAuth();
  const { login } = useAuth();
  const { demos } = useDemos();
  const { spots } = useSpots();
  const { active } = usePlayback();
  const { demo, spot, status } = toJS(active);
  const generateAnonymousAuth = () => {
    signInAnonymously(auth)
      .then(({ user }) => {
        login(user);
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  const initializeApp = () => {
    generateAnonymousAuth();
  };

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

  useEffect(initializeApp, []);
  useEffect(playActive, [demo, spot, status]);
  return (
    <ReactiveContext.Provider value={{}}>{children}</ReactiveContext.Provider>
  );
});
