import { Entypo } from "@expo/vector-icons";
import BigButton from "components/Buttons/BigButton";
import AppText from "components/Controls/Text";
import { AppColor } from "constants/Colors";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Sizes } from "styles/sizes";
import { generateStyles } from "./styles";

const LineLine = observer(({ id }: { id: string }) => {
  const colors = useColors();
  const [expanded, expand] = useState(false);
  const {
    listItem,
    titleText,
    smallText,
    content,
    spacer,
    checkHolder,
    expanderColumn,
    header,
    expandedContent,
    buttonHolder,
  } = generateStyles(colors, {
    expanded,
  });

  const chevIcon = expanded ? "chevron-small-down" : "chevron-small-right";

  const toggleExpand = () => {
    expand(!expanded);
  };

  const icon = false ? "check" : "circular-graph";

  return (
    <Pressable style={listItem} onPress={toggleExpand}>
      <View style={content}>
        <View style={expanderColumn}>
          <Entypo
            name={chevIcon}
            color={colors.Text.subtle}
            size={Sizes.Fonts.ICONS}
          />
        </View>
        <View style={spacer}>
          <View style={header}>
            <View>
              <Text style={titleText}>Line 12</Text>
              <Text style={smallText}>Some Summary</Text>
            </View>
            <View style={spacer} />
            <View style={checkHolder}>
              <Entypo
                name={icon}
                color={AppColor.WARM_WHITE}
                size={Sizes.Fonts.HEADER}
              />
            </View>
          </View>
          {expanded && (
            <View style={expandedContent}>
              <AppText>
                "I want to stop by the gap for the half off sale!"
              </AppText>
              <View style={buttonHolder}>
                <BigButton onPress={() => {}} icon="mic" label="Record" />
              </View>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
});
export default LineLine;
