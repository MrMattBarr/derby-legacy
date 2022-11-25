import { action, makeObservable, observable } from "mobx";

import { useLocalObservable } from "mobx-react";
import React, { useContext } from "react";
import { fetchUser } from "../api";
import User from "../types/User";

type IUsersStore = {
  userIds: string[];
  users: Record<string, User>;
  addUser: (user: User) => void;
  processUserIds: (userIds: string[]) => void;
  loadUser: (userId: string) => void;
};

export function UsersStore() {
  return makeObservable<IUsersStore>(
    {
      users: {},
      userIds: [],
      processUserIds(userIds: string[]) {
        userIds.forEach((id) => fetchUser(id, this.addUser.bind(this)));
      },

      addUser(user: User) {
        console.log({ user });
        this.users[user.id] = user;

        const spotAlreadyThere = this.userIds.includes(user.id);
        if (!spotAlreadyThere) {
          this.userIds.push(user.id);
        }
      },
      loadUser(userId: string) {
        if (!userId) {
          throw new Error("Unable to load user with no ID");
        }
        if (!this.users[userId]) {
          this.processUserIds([userId]);
        }
      },
    },
    {
      users: observable,
      userIds: observable,
    }
  );
}
export const UsersContext = React.createContext<IUsersStore | undefined>(
  undefined
);

export const UsersStoreProvider = ({ children }: any) => {
  const store = useLocalObservable(UsersStore);
  return (
    <UsersContext.Provider value={store}>{children}</UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
