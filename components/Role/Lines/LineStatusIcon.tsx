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

const LineStatusIcon = observer(() => {
  const colors = useColors();
  const { line } = useLine();
  if (!line) {
    return <></>;
  }
  const { checkHolder, titleText } = generateStyles(colors, {
    status: line.status,
  });

  const iconByStatus = {
    [ApprovalStatus.APPROVED]: "check",
    [ApprovalStatus.REJECTED]: "check",
    [ApprovalStatus.UNHEARD]: undefined,
  };

  const icon = iconByStatus[line.status];

  return (
    <View style={checkHolder}>
      {icon && (
        <Entypo
          name={icon as any}
          color={statusColor(line.status, colors)}
          size={Sizes.Fonts.HEADER}
        />
      )}
    </View>
  );
});

export default LineStatusIcon;
