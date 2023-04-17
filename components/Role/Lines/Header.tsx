import Entypo from "@expo/vector-icons/build/Entypo";
import { AppColor } from "constants/Colors";
import useLine from "contexts/LineContext";
import { useColors } from "hooks/useColorScheme";
import React from "react";
import { Text, View } from "react-native";
import { Sizes } from "styles/sizes";
import { generateStyles } from "./styles";
import LineStatusIcon from "./LineStatusIcon";
import { ApprovalStatus } from "types/Take";
import { useTakes } from "stores/TakesStore";
import { observer } from "mobx-react";
import TakeLine from "./Take";
import ExpanderColumn from "./ExpanderColumn";
import useRole from "contexts/RoleContext";

const Header = observer(({ expanded }: { expanded: boolean }) => {
  const colors = useColors();
  const { line } = useLine();
  const takeStore = useTakes();
  const { isTalent } = useRole();
  if (!line) {
    return <></>;
  }
  const { titleText, smallText, header, headerText } = generateStyles(colors, {
    expanded,
    status: line.status,
    modifiers: { isTalent },
  });

  const lineApproved = line.status === ApprovalStatus.APPROVED;

  if (lineApproved) {
    const approvedTake = line.takes.find(
      (x) => takeStore.things[x]?.status === ApprovalStatus.APPROVED
    );
    if (approvedTake) {
      return (
        <View style={header}>
          <ExpanderColumn expanded={expanded} />
          <View style={headerText}>
            <TakeLine id={approvedTake} title={line.name} compact />
          </View>
          <LineStatusIcon />
        </View>
      );
    }
  }

  return (
    <View style={header}>
      <ExpanderColumn expanded={expanded} />
      <View style={headerText}>
        <Text style={titleText}>{line?.name}</Text>
        {!expanded && (
          <Text style={smallText} ellipsizeMode="tail" numberOfLines={1}>
            {line.text}
          </Text>
        )}
      </View>
      <LineStatusIcon />
    </View>
  );
});

export default Header;
