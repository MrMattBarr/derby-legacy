import React from "react";
import useUser from "../../contexts/UserContext";
import { useColors } from "../../hooks/useColorScheme";
import Avatar from "../Avatar";
import EditableText from "../Controls/EditableText";
import { Text, View } from "../Themed";
import Rates from "./Rates";
import { generateStyles } from "./styles";

const UserCard = () => {
  const colors = useColors();
  const { userCard, userSummary, username, tags } = generateStyles(colors);
  const { user, isSelf, update } = useUser();
  const updateName = (newName?: string) => {
    if (newName) {
      update({ field: "displayName", value: newName });
    }
  };
  if (!user) {
    return <></>;
  }
  return (
    <View style={userCard}>
      <Avatar size={100} editable />
      <View style={userSummary}>
        <EditableText
          text={user.profile?.displayName}
          canEdit={isSelf}
          onCommit={updateName}
        />
        <Text style={tags}>Energetic, Confident, Masculine</Text>
        <Rates />
        <Text style={tags}>Roles go here</Text>
      </View>
    </View>
  );
};

export default UserCard;
