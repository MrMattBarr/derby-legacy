import AppText from "components/Controls/Text";
import useLine from "contexts/LineContext";
import useRole from "contexts/RoleContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { ApprovalStatus } from "types/Take";
import ExistingTakes from "./ExistingTakes";
import Header from "./Header";
import RecordButton from "./RecordButton";
import { generateStyles } from "./styles";

const LineLine = observer(() => {
  const colors = useColors();
  const line = useLine().line!;
  const [expanded, expand] = useState(false);
  const { isTalent } = useRole();
  const maxTakes = 3;
  const {
    listItem,
    expandedContent,
    buttonHolder,
    textHolder,
    content,
    remainder,
    expanderColumn,
  } = generateStyles(colors, {
    expanded,
    status: line.status,
  });

  const toggleExpand = () => {
    expand(!expanded);
  };
  const moreTakesAllowed = (line.takes?.length ?? 0) < maxTakes;
  const lineApproved = line.status === ApprovalStatus.APPROVED;
  const canRecordTake = isTalent && moreTakesAllowed && !lineApproved;
  return (
    <Pressable style={listItem} onPress={toggleExpand}>
      <View style={content}>
        <Header expanded={expanded} />
        {expanded && (
          <View style={expandedContent}>
            <View style={textHolder}>
              <AppText>{line.text}</AppText>
            </View>
            <ExistingTakes />
            {canRecordTake && (
              <View style={buttonHolder}>
                <View style={expanderColumn} />
                <View style={remainder}>
                  <RecordButton />
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
});
export default LineLine;
