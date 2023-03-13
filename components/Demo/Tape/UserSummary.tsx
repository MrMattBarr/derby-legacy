import { useFonts } from "@expo-google-fonts/kalam";
import { useLinkTo } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";

import { Pressable, StyleSheet, Text } from "react-native";
import useDemo from "../../../contexts/DemoContext";
import { useUsers } from "../../../stores/UsersStore";
import Avatar from "../../Avatar";
import { View } from "../../Themed";
import { useTape } from "./Context";

const UserSummary = observer(() => {
  const users = useUsers();
  const { unitSize } = useTape();
  const [fontsLoaded] = useFonts({
    Kalam: require("/assets/fonts/Kalam-Regular.ttf"),
    Slab: require("/assets/fonts/ZillaSlab-Regular.ttf"),
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
      width: "95%",
      paddingVertical: unitSize * 5,
      borderRadius: unitSize * 2,
      color: "black",
    },
    username: {
      color: "black",
      fontFamily: "Slab",
      fontSize: unitSize * 12,
      marginLeft: unitSize * 5,
      marginTop: unitSize * 2,
    },
    avatar: {
      width: avatarSize,
      height: avatarSize,
      marginRight: unitSize * 5,
    },
    userLink: {
      display: "flex",
      alignItems: "flex-end",
      flexDirection: "row",
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
        <Avatar size={unitSize * 16} borderWidth={unitSize / 1.5} />
        <Text style={s.username}>{displayName}</Text>
      </Pressable>
    </View>
  );
});

export default UserSummary;
