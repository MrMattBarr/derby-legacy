import { runInAction, toJS } from "mobx";
import { observer, useLocalObservable } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { TEST_USER } from "../testData/users";
import User from "../types/User";

type UserStore = {
  user?: User;
  login: () => void;
};

const UserContext = React.createContext({} as UserStore);
export const UserProvider = observer(({ children }: any) => {
  const store = useLocalObservable<UserStore>(() => ({
    user: undefined,
    login() {
      runInAction(() => (this.user = TEST_USER));
    },
  }));

  const jsUser = toJS(store).user;

  useEffect(() => {
    if (!jsUser) {
      store.login();
    }
  }, [jsUser]);

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
