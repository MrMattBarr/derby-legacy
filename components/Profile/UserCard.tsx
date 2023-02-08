import React from "react";
import useUser from "../../contexts/UserContext";
import { useColors } from "../../hooks/useColorScheme";
import Avatar from "../Avatar";
import { Text, View } from "../Themed";
import Rates from "./Rates";
import { generateStyles } from "./styles";

const UserCard = () => {
  const colors = useColors();
  const { userCard, userSummary, username, tags } = generateStyles(colors);
  const { user } = useUser();
  if (!user) {
    return <></>;
  }
  return (
    <View style={userCard}>
      <Avatar size={100} framed editable />
      <View style={userSummary}>
        <Text style={username}>{user.profile?.displayName}</Text>
        <Text style={tags}>Energetic, Confident, Masculine</Text>
        <Rates />
        <Text style={tags}>Roles go here</Text>
      </View>
    </View>
  );
};

export default UserCard;
