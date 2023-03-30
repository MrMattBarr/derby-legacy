import { observer } from "mobx-react";
import React from "react";
import { UserProvider } from "../../contexts/UserContext";
import { useColors } from "../../hooks/useColorScheme";
import { useAuth } from "../../stores/AuthStore";
import { ParameterPage } from "../../types/ParameterPage";
import Page from "../Page";
import { View } from "../Themed";
import AccountsControls from "./AccountControls/index ";
import FavoriteDemo from "./FavoriteDemo";
import { generateStyles } from "./styles";
import UserCard from "./UserCard";

const Profile = observer((args?: ParameterPage) => {
  const authStore = useAuth();
  const id = args?.route?.params?.id;
  const colors = useColors();
  const { page } = generateStyles(colors);
  if (!id) {
    return <></>;
  }
  return (
    <UserProvider id={id}>
      <Page unpadded>
        <View style={page}>
          <UserCard />
          <FavoriteDemo />
          <AccountsControls />
        </View>
      </Page>
    </UserProvider>
  );
});

export default Profile;
