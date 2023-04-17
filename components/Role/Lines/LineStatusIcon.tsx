import Entypo from "@expo/vector-icons/build/Entypo";
import { AppColor } from "constants/Colors";
import useLine from "contexts/LineContext";
import { useColors } from "hooks/useColorScheme";
import React from "react";
import { Sizes } from "styles/sizes";
import { generateStyles, statusColor } from "./styles";
import { View } from "react-native";
import { ApprovalStatus } from "types/Take";
import { observer } from "mobx-react";
import useRole from "contexts/RoleContext";

const LineStatusIcon = observer(() => {
  const colors = useColors();
  const { line } = useLine();
  const { isTalent } = useRole();
  if (!line) {
    return <></>;
  }
  const { checkHolder } = generateStyles(colors, {
    status: line.status,
    modifiers: { isTalent },
  });

  const iconByStatus = {
    [ApprovalStatus.APPROVED]: "check",
    [ApprovalStatus.REJECTED]: "check",
    [ApprovalStatus.UNHEARD]: "progress-one",
    [ApprovalStatus.HEARD]: "progress-two",
  };

  const icon = iconByStatus[line.status];

  return (
    <View style={checkHolder}>
      {icon && (
        <Entypo
          name={icon as any}
          color={statusColor(line.status, colors, { isTalent })}
          size={Sizes.Fonts.HEADER}
        />
      )}
    </View>
  );
});

export default LineStatusIcon;
