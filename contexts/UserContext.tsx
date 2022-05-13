import { useLinkTo } from "@react-navigation/native";
import { runInAction, toJS } from "mobx";
import { observer, useLocalObservable } from "mobx-react";
import React, { useContext, useEffect } from "react";
import User from "../types/User";

type UserStore = {
  user?: User;
  login: (user: User | undefined) => void;
  logout: () => void;
};

const UserContext = React.createContext({} as UserStore);
export const UserProvider = observer(({ children }: any) => {
  const linkTo = useLinkTo();
  const store = useLocalObservable<UserStore>(() => ({
    user: undefined,
    login(user?: User | undefined) {
      runInAction(() => (this.user = user));
      linkTo("/demos");
    },
    logout() {
      runInAction(() => (this.user = undefined));
      linkTo("/home");
    },
  }));

  return <UserContext.Provider value={store}>{children}</UserContext.Provider>;
});

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default useUser;
