import { FontAwesome } from "@expo/vector-icons";
import { NavPage } from "constants/Navigation";
import useAppNav from "contexts/NavigationContext";
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

  const goToRole = () => {
    go(NavPage.ROLE, { id: 123 });
  };

  return (
    <TouchableOpacity activeOpacity={0.7} style={listItem} onPress={goToRole}>
      <View style={content}>
        <View>
          <Text style={titleText}>Some Role</Text>
          <Text style={smallText}>23 lines</Text>
        </View>
        <View style={calendar}>
          <FontAwesome name="calendar-o" color={colors.Text.subtle} size={35} />
          <Text style={daysLeft}>8</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});
export default RoleLine;
