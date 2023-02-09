import { runInAction } from "mobx";
import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { updateUser } from "../api";
import { useAuth } from "../stores/AuthStore";
import { useUsers } from "../stores/UsersStore";
import User from "../types/User";

interface UserUpdate {
  field: "avatar";
  value: string;
}
type IUserContext = {
  user: User;
  update: (update: UserUpdate) => void;
  isSelf: boolean;
};

const UserContext = React.createContext({} as IUserContext);
export const UserProvider = observer(({ children, id }: any) => {
  const userStore = useUsers();

  useEffect(() => {
    userStore.loadUser(id);
  }, [userStore]);

  const user = userStore.users[id];
  const authStore = useAuth();
  const isSelf = id === authStore.user?.uid;

  const update = ({ field, value }: UserUpdate) => {
    runInAction(() => {
      user.profile![field] = value;
      updateUser({ id: user.id, profile: user.profile });
    });
  };

  return (
    <UserContext.Provider value={{ user, isSelf, update }}>
      {children}
    </UserContext.Provider>
  );
});

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default useUser;
