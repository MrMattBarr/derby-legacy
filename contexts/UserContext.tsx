import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { useAuth } from "../stores/AuthStore";
import { useUsers } from "../stores/UsersStore";
import User from "../types/User";

type IUserContext = {
  user: User;
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

  return (
    <UserContext.Provider value={{ user, isSelf }}>
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
