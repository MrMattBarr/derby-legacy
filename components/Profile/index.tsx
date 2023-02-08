import { observer } from "mobx-react";
import React from "react";
import { Text } from "react-native";
import { UserProvider } from "../../contexts/UserContext";
import { useColors } from "../../hooks/useColorScheme";
import { useAuth } from "../../stores/AuthStore";
import { ParameterPage } from "../../types/ParameterPage";
import Controls from "../Demo/Controls";
import Page from "../Page";
import { View } from "../Themed";
import FavoriteDemo from "./FavoriteDemo";
import { generateStyles } from "./styles";
import UserCard from "./UserCard";

const Profile = observer(({ route }: ParameterPage) => {
  const authStore = useAuth();
  const id = route?.params?.id ?? authStore.user?.uid;
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
        </View>
      </Page>
    </UserProvider>
  );
});

export default Profile;
