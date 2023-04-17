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
import useRole from "contexts/RoleContext";
import { ApprovalStatus } from "types/Take";
import { Entypo } from "@expo/vector-icons";
import useTake from "contexts/TakeContext";
import useProject from "contexts/ProjectContext";
import { AppColor } from "constants/Colors";

const FreshTake = observer(() => {
  const colors = useColors();
  const { expanderColumn } = generateStyles(colors);
  const { take } = useTake();
  const { isOwner } = useProject();

  const isFresh = take?.status === ApprovalStatus.UNHEARD;
  const showFresh = isFresh && isOwner;
  return (
    <View style={expanderColumn}>
      {showFresh && (
        <Entypo name="light-up" size={25} color={colors.Text.notice} />
      )}
    </View>
  );
});
export default FreshTake;
