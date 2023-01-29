import { observer } from "mobx-react";
import React from "react";
import { Text } from "react-native";
import { UserProvider } from "../../contexts/UserContext";
import { useAuth } from "../../stores/AuthStore";
import { ParameterPage } from "../../types/ParameterPage";
import Controls from "../Demo/Controls";
import Page from "../Page";
import FavoriteDemo from "./FavoriteDemo";
import UserCard from "./UserCard";

const Profile = observer(({ route }: ParameterPage) => {
  const authStore = useAuth();
  const id = route?.params?.id ?? authStore.user?.uid;
  if (!id) {
    return <></>;
  }
  return (
    <UserProvider id={id}>
      <Page unpadded>
        <UserCard />
        <FavoriteDemo />
      </Page>
    </UserProvider>
  );
});

export default Profile;
