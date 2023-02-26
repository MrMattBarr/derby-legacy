import { useFonts } from "@expo-google-fonts/kalam";
import { Link, useLinkTo } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";

import { Image, Pressable, StyleSheet, Text } from "react-native";
import useDemo from "../../../contexts/DemoContext";
import { useUsers } from "../../../stores/UsersStore";
import { Sizes } from "../../../styles/sizes";
import Avatar from "../../Avatar";
import { View } from "../../Themed";
import { useTape } from "./Tape";

const UserSummary = observer(() => {
  const users = useUsers();
  const { unitSize } = useTape();
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
      paddingVertical: unitSize * 5,
      borderRadius: unitSize * 2,
      color: "black",
    },
    username: {
      color: "black",
      fontSize: unitSize * 10,
      marginLeft: Sizes.Spacings.STANDARD,
      marginTop: unitSize * 2,
    },
    avatar: {
      width: avatarSize,
      height: avatarSize,
      marginRight: unitSize * 5,
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
        <Avatar size={unitSize * 20} borderWidth={unitSize / 1.5} />
        <Text style={s.username}>{displayName}</Text>
      </Pressable>
    </View>
  );
});

export default UserSummary;
