import { Entypo } from "@expo/vector-icons";
import { useColors } from "hooks/useColorScheme";
import React from "react";
import { View } from "react-native";
import { Sizes } from "styles/sizes";
import { generateStyles } from "./styles";

const ExpanderColumn = ({ expanded }: { expanded: boolean }) => {
  const colors = useColors();
  const { expanderColumn } = generateStyles(colors, {
    expanded,
  });

  const chevIcon = expanded ? "chevron-small-down" : "chevron-small-right";

  return (
    <View style={expanderColumn}>
      <Entypo
        name={chevIcon}
        color={colors.Text.subtle}
        size={Sizes.Fonts.ICONS}
      />
    </View>
  );
};
export default ExpanderColumn;
