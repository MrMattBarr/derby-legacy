import Entypo from "@expo/vector-icons/build/Entypo";
import { AppColor } from "constants/Colors";
import useLine from "contexts/LineContext";
import { useColors } from "hooks/useColorScheme";
import React from "react";
import { Text, View } from "react-native";
import { Sizes } from "styles/sizes";
import { generateStyles } from "./styles";

const Header = ({ expanded }: { expanded: boolean }) => {
  const colors = useColors();
  const { titleText, smallText, header, headerText, checkHolder } =
    generateStyles(colors, {
      expanded,
    });
  const { line } = useLine();
  if (!line) {
    return <></>;
  }

  const icon = false ? "check" : "circular-graph";
  return (
    <View style={header}>
      <View style={headerText}>
        <Text style={titleText}>{line?.name}</Text>
        {!expanded && (
          <Text style={smallText} ellipsizeMode="tail" numberOfLines={1}>
            {line.text}
          </Text>
        )}
      </View>
      <View style={checkHolder}>
        <Entypo
          name={icon}
          color={AppColor.WARM_WHITE}
          size={Sizes.Fonts.HEADER}
        />
      </View>
    </View>
  );
};

export default Header;
