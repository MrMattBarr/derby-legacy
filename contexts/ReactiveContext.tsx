import { useURL, parse } from "expo-linking";
import { getAuth } from "firebase/auth";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {
  removeSpotFromUser,
  subscribeToUserDemos,
  subscribeToUserSpots,
} from "../api";
import { useAuth } from "../stores/AuthStore";
import { useDemos } from "../stores/DemosStore";
import { useSpots } from "../stores/SpotsStore";
import { useUsers } from "../stores/UsersStore";
import useAppNav from "./NavigationContext";
import { NavPage } from "constants/Navigation";

const ReactiveContext = React.createContext({});
export const ReactiveProvider = observer(({ children }: any) => {
  const url = useURL();

  const firebaseAuth = getAuth();
  const authStore = useAuth();
  const userStore = useUsers();
  const demoStore = useDemos();
  const { go } = useAppNav();
  const spotStore = useSpots();
  const user = authStore.user?.uid
    ? userStore.users[authStore.user?.uid]
    : undefined;
  // const generateAnonymousAuth = () => {
  //   signInAnonymously(firebaseAuth)
  //     .then(({ user }) => {
  //       authStore.login(user);
  //       userStore.loadUser(user.uid);
  //     })
  //     .catch((error) => {
  //       console.log({ error });
  //     });
  // };

  useEffect(() => {
    if (!!user && !!url) {
      const { path, queryParams } = parse(url ?? "");
      const found = Object.values(NavPage).includes(path as NavPage);
      if (found) {
        go(path as NavPage, queryParams);
      }
    }
  }, [url, user]);

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
        spotStore.processIds(spotIds, onError);
      });
    } else {
      // generateAnonymousAuth();
    }
  });

  return (
    <ReactiveContext.Provider value={{}}>{children}</ReactiveContext.Provider>
  );
});
