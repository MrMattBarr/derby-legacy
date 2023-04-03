import AppText from "components/Controls/Text";
import { RecordingBoothProvider } from "components/modals/Recording/context";
import useLine from "contexts/LineContext";
import { useColors } from "hooks/useColorScheme";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import ExpanderColumn from "./ExpanderColumn";
import Header from "./Header";
import RecordButton from "./RecordButton";
import { generateStyles } from "./styles";
import { useLines } from "stores/LinesStore";
import { TEST_LINE } from "testData/lines";

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
