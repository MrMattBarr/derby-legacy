import { User } from "firebase/auth";
import { action, makeObservable, observable, runInAction } from "mobx";

import { useLocalObservable } from "mobx-react";
import React, { useContext } from "react";
import { FirebaseUserCredentials, signIn, signOut } from "../api";

type IAuthStore = {
  user?: User;
  authenticateWithEmail: (
    credentials: FirebaseUserCredentials
  ) => Promise<User | undefined>;
  login: (user: User | undefined) => void;
  logout: () => void;
  authenticating: boolean;
};

export function AuthStore() {
  return makeObservable<IAuthStore>(
    {
      user: undefined,
      authenticating: false,
      async authenticateWithEmail(credentials) {
        const user = await signIn(credentials);
        if (user) {
          this.login(user);
          return user;
        }
      },
      login(user?: User) {
        runInAction(() => (this.user = user));
      },
      async logout() {
        await signOut();
        runInAction(() => (this.user = undefined));
      },
    },
    {
      user: observable,
      authenticateWithEmail: action,
      login: action,
      logout: action,
    }
  );
}
export const AuthContext = React.createContext<IAuthStore | undefined>(
  undefined
);

export const AuthStoreProvider = ({ children }: any) => {
  const store = useLocalObservable(AuthStore);
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
