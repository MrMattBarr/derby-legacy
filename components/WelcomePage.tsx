import { observer } from "mobx-react-lite";
import React from "react";
import { useAuth } from "../stores/AuthStore";
import { useUsers } from "../stores/UsersStore";
import BigButton from "./Buttons/BigButton";
import LoggedOutView from "./LoggedOutView";
import Page from "./Page";
import Profile from "./Profile";

const WelcomePage = observer(() => {
  const authStore = useAuth();
  const userStore = useUsers();
  const uid = authStore.user?.uid;
  if (uid) {
    const user = userStore.users[uid];
    if (user) {
      return <Profile />;
    }
  }
  return <LoggedOutView />;
});

export default WelcomePage;
