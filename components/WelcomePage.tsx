import { NavPage } from "constants/Navigation";
import useAppNav from "contexts/NavigationContext";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useAuth } from "stores/AuthStore";
import { useUsers } from "stores/UsersStore";
import LoggedOutView from "./LoggedOutView";

const WelcomePage = observer(() => {
  const authStore = useAuth();
  const userStore = useUsers();
  const { reset } = useAppNav();
  const uid = authStore.user?.uid;

  const user = uid ? userStore.users[uid] : undefined;

  useEffect(() => {
    if (user) {
      reset(NavPage.PROFILE, { id: uid });
    }
  }, [user]);

  return <LoggedOutView />;
});

export default WelcomePage;
