import { getAuth, signInAnonymously } from "firebase/auth";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import {
  removeSpotFromUser,
  subscribeToUserDemos,
  subscribeToUserSpots,
} from "../api";
import { useAuth } from "../stores/AuthStore";
import { useDemos } from "../stores/DemosStore";
import { useSpots } from "../stores/SpotsStore";
import { useUsers } from "../stores/UsersStore";

const ReactiveContext = React.createContext({});
export const ReactiveProvider = observer(({ children }: any) => {
  const firebaseAuth = getAuth();
  const authStore = useAuth();
  const userStore = useUsers();
  const demoStore = useDemos();
  const spotStore = useSpots();
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
        const onError = (spotId: string) =>
          removeSpotFromUser({ spotId, userId: authUser.uid });
        spotStore.processSpotIds(spotIds, onError);
      });
    } else {
      // generateAnonymousAuth();
    }
  });

  return (
    <ReactiveContext.Provider value={{}}>{children}</ReactiveContext.Provider>
  );
});
