import { Entypo } from "@expo/vector-icons";
import BigButton from "components/Buttons/BigButton";
import AppText from "components/Controls/Text";
import { RecordingBoothProvider } from "components/modals/Recording/context";
import { AppColor } from "constants/Colors";
import useLine from "contexts/LineContext";
import { useColors } from "hooks/useColorScheme";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Sizes } from "styles/sizes";
import ExpanderColumn from "./ExpanderColumn";
import Header from "./Header";
import RecordButton from "./RecordButton";
import { generateStyles } from "./styles";

const LineLine = () => {
  const colors = useColors();
  const line = useLine().line!;
  const [expanded, expand] = useState(false);
  const { listItem, expandedContent, buttonHolder, textHolder, content } =
    generateStyles(colors, {
      expanded,
    });

  const toggleExpand = () => {
    expand(!expanded);
  };

  return (
    <RecordingBoothProvider>
      <Pressable style={listItem} onPress={toggleExpand}>
        <ExpanderColumn expanded={expanded} />
        <View style={content}>
          <Header expanded={expanded} />
          {expanded && (
            <View style={expandedContent}>
              <View style={textHolder}>
                <AppText>{line.text}</AppText>
              </View>
              <View style={buttonHolder}>
                <RecordButton />
              </View>
            </View>
          )}
        </View>
      </Pressable>
    </RecordingBoothProvider>
  );
};
export default LineLine;
