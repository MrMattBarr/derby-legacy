import { FontAwesome } from "@expo/vector-icons";
import { NavPage } from "constants/Navigation";
import useAppNav from "contexts/NavigationContext";
import useRole from "contexts/RoleContext";
import { observer } from "mobx-react";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useColors } from "../../hooks/useColorScheme";
import { generateStyles } from "./styles";

const RoleLine = observer(() => {
  const colors = useColors();
  const { go } = useAppNav();
  const { listItem, titleText, calendar, smallText, content, daysLeft } =
    generateStyles(colors);
  const { role } = useRole();

  if (!role) {
    return <></>;
  }

  const goToRole = () => {
    go(NavPage.ROLE, { id: role.id });
  };
  const now = new Date();
  const MS_IN_DAY = 86400000;
  const msTilDue = role.dueDate - now.getTime();

  const daysTilDue = Math.floor(msTilDue / MS_IN_DAY);

  const lineWord = role.lines.length === 1 ? "line" : "lines";

  return (
    <TouchableOpacity activeOpacity={0.7} style={listItem} onPress={goToRole}>
      <View style={content}>
        <View>
          <Text style={titleText}>{role.name}</Text>
          <Text style={smallText}>{`${role.lines.length} ${lineWord}`}</Text>
        </View>
        <View style={calendar}>
          <FontAwesome name="calendar-o" color={colors.Text.subtle} size={35} />
          <Text style={daysLeft}>{daysTilDue}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});
export default RoleLine;
