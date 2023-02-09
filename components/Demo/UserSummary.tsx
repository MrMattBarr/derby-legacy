import { useFonts } from "@expo-google-fonts/kalam";
import { Link, useLinkTo } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";

import { Image, Pressable, StyleSheet, Text } from "react-native";
import useDemo from "../../contexts/DemoContext";
import { useUsers } from "../../stores/UsersStore";
import { Sizes } from "../../styles/sizes";
import Avatar from "../Avatar";
import { View } from "../Themed";

const UserSummary = observer(() => {
  const users = useUsers();
  const [fontsLoaded] = useFonts({
    Kalam: require("/assets/fonts/Kalam-Regular.ttf"),
  });

  const linkTo = useLinkTo();

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
      marginLeft: Sizes.Spacings.STANDARD,
      marginTop: 5,
    },
    avatar: {
      width: avatarSize,
      height: avatarSize,
      marginRight: 10,
    },
    userLink: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
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
    return <></>;
  }

  const userProfileLink = `/profile/${user?.id}`;
  const goToUser = () => {
    linkTo(userProfileLink);
  };
  return (
    <View style={s.userSummary}>
      <Pressable onPress={goToUser} style={s.userLink}>
        <Avatar size={30} />
        <Text style={s.username}>{displayName}</Text>
      </Pressable>
    </View>
  );
});

export default UserSummary;
