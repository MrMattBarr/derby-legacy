import { Entypo } from "@expo/vector-icons";
import { AppColor } from "constants/Colors";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Sizes } from "styles/sizes";
import { generateStyles } from "./styles";

const LineLine = observer(() => {
  const colors = useColors();
  const [expanded, expand] = useState(false);
  const { listItem, titleText, smallText, content, spacer, checkHolder } =
    generateStyles(colors, {
      expanded,
    });

  const chevIcon = expanded ? "chevron-small-down" : "chevron-small-right";

  const toggleExpand = () => {
    expand(!expanded);
  };

  return (
    <Pressable style={listItem} onPress={toggleExpand}>
      <View style={content}>
        <Entypo
          name={chevIcon}
          color={colors.Text.subtle}
          size={Sizes.Fonts.ICONS}
        />
        <View>
          <Text style={titleText}>Line 12</Text>
          <Text style={smallText}>Some Summary</Text>
        </View>
        <View style={spacer} />
        <View style={checkHolder}>
          <Entypo
            name="check"
            color={AppColor.TRANSPARENT}
            size={Sizes.Fonts.HEADER}
          />
        </View>
      </View>
    </Pressable>
  );
});
export default LineLine;
