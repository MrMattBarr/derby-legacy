import { useFonts } from "@expo-google-fonts/kalam";
import { Link } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { observer } from "mobx-react";
import React from "react";

import { Image, StyleSheet } from "react-native";
import useUser from "../../contexts/UserContext";
import { View } from "../Themed";

const UserSummary = observer(() => {
  const users = useUser();
  const [fontsLoaded] = useFonts({
    Kalam: require("/assets/fonts/Kalam-Regular.ttf"),
  });

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
      borderRadius: avatarSize,
      borderColor: "black",
      borderWidth: 1,
      marginRight: 10,
    },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const src = { uri: "https://i.pravatar.cc/50" };

  return (
    <View style={s.userSummary}>
      <Image source={src} style={s.avatar} />
      <Link to="/users/TEST_USER" style={s.username}>
        {users.user?.display || "Test User"}
      </Link>
    </View>
  );
});

export default UserSummary;
