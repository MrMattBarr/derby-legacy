import { AVPlaybackStatus } from "expo-av";
import { getAuth, signInAnonymously } from "firebase/auth";
import { runInAction, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { subscribeToUserDemos, subscribeToUserSpots } from "../api";
import { useAuth } from "../stores/AuthStore";
import { useDemos } from "../stores/DemosStore";
import { useSpots } from "../stores/SpotsStore";
import { useUsers } from "../stores/UsersStore";
import Demo from "../types/Demo";
import usePlayback, { PlayState } from "./PlaybackContext";

const ReactiveContext = React.createContext({});
export const ReactiveProvider = observer(({ children }: any) => {
  const [user, setUser] = useState();
  const firebaseAuth = getAuth();
  const authStore = useAuth();
  const userStore = useUsers();
  const demoStore = useDemos();
  const spotStore = useSpots();
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
      userStore.loadUser(authUser.uid);
      subscribeToUserDemos(authUser.uid, (demoIds: string[]) => {
        demoStore.processDemoIds(demoIds);
      });
      subscribeToUserSpots(authUser.uid, (spotIds: string[]) => {
        spotStore.processSpotIds(spotIds);
      });
    } else {
      generateAnonymousAuth();
    }
  });

  return (
    <ReactiveContext.Provider value={{}}>{children}</ReactiveContext.Provider>
  );
});
