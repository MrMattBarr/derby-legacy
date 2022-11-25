import { useFonts } from "@expo-google-fonts/kalam";
import { Link } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { observer } from "mobx-react";
import React from "react";

import { Image, StyleSheet } from "react-native";
import useDemo from "../../contexts/DemoContext";
import { useUsers } from "../../stores/UsersStore";
import { View } from "../Themed";

const UserSummary = observer(() => {
  const users = useUsers();
  const [fontsLoaded] = useFonts({
    Kalam: require("/assets/fonts/Kalam-Regular.ttf"),
  });

  const demo = useDemo();
  const userId = demo.demo?.userId;
  const user = users.users[userId ?? -1];
  const displayName = user?.profile?.displayName;

  const avatarSize = 35;

  const s = StyleSheet.create({
    userSummary: {
      backgroundColor: "#0000",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      position: "absolute",
      bottom: 0,
      width: "85%",
      paddingVertical: 10,
      borderRadius: 4,
      color: "black",
    },
    username: {
      color: "black",
      fontSize: 20,
      marginTop: 5,
    },
    avatar: {
      width: avatarSize,
      height: avatarSize,
      marginRight: 10,
    },
    avatarPlaceHolder: {
      width: avatarSize,
      height: avatarSize,
      borderRadius: avatarSize,
      backgroundColor: "#333",
      marginRight: 10,
    },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const src = { uri: user?.profile?.avatar };
  const userProfileLink = `/users/${user?.id}`;
  return (
    <View style={s.userSummary}>
      {src && <Image source={src} style={s.avatar} />}
      {!src && <View style={s.avatarPlaceHolder} />}
      <Link to={userProfileLink} style={s.username}>
        {displayName}
      </Link>
    </View>
  );
});

export default UserSummary;
