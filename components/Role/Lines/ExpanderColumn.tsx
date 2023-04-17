import { Entypo } from "@expo/vector-icons";
import { useColors } from "hooks/useColorScheme";
import React from "react";
import { View } from "react-native";
import { Sizes } from "styles/sizes";
import { generateStyles } from "./styles";
import useLine from "contexts/LineContext";
import useRole from "contexts/RoleContext";

const ExpanderColumn = ({ expanded }: { expanded: boolean }) => {
  const colors = useColors();
  const { line } = useLine();
  const { isTalent } = useRole();
  const { expanderColumn, titleText } = generateStyles(colors, {
    expanded,
    status: line?.status,
    modifiers: { isTalent },
  });

  const chevIcon = expanded ? "chevron-small-down" : "chevron-small-right";
  return (
    <View style={expanderColumn}>
      <Entypo
        name={chevIcon}
        color={titleText.color}
        size={Sizes.Fonts.ICONS}
      />
    </View>
  );
};
export default ExpanderColumn;
