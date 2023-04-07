import AppText from "components/Controls/Text";
import useLine from "contexts/LineContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import ExistingTakes from "./ExistingTakes";
import ExpanderColumn from "./ExpanderColumn";
import Header from "./Header";
import RecordButton from "./RecordButton";
import { generateStyles } from "./styles";

const LineLine = observer(() => {
  const colors = useColors();
  const line = useLine().line!;
  const [expanded, expand] = useState(false);
  const maxTakes = 1;
  const { listItem, expandedContent, buttonHolder, textHolder, content } =
    generateStyles(colors, {
      expanded,
    });

  const toggleExpand = () => {
    expand(!expanded);
  };
  const canAddTakes = (line.takes?.length ?? 0) < maxTakes;
  return (
    <Pressable style={listItem} onPress={toggleExpand}>
      <ExpanderColumn expanded={expanded} />
      <View style={content}>
        <Header expanded={expanded} />
        {expanded && (
          <View style={expandedContent}>
            <View style={textHolder}>
              <AppText>{line.text}</AppText>
            </View>
            <ExistingTakes />
            {canAddTakes && (
              <View style={buttonHolder}>
                <RecordButton />
              </View>
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
});
export default LineLine;
