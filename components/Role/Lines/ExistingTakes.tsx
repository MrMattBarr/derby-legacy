import Nothing from "components/Nothing";
import useLine from "contexts/LineContext";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import TakeLine from "./Take";
import { Sizes } from "styles/sizes";
import { useTakes } from "stores/TakesStore";
import { ApprovalStatus } from "types/Take";

const ExistingTakes = observer(() => {
  const { line } = useLine();
  const takeStore = useTakes();
  let takes = line?.takes ?? [];
  if (takes.length === 0 || !line) {
    return <Nothing />;
  }

  const lineApproved = line.status === ApprovalStatus.APPROVED;

  if (lineApproved) {
    const approvedTake = line.takes.find(
      (x) => takeStore.things[x]?.status === ApprovalStatus.APPROVED
    );
    takes = takes.filter((x) => x !== approvedTake);
  }
  return (
    <View style={{ paddingBottom: Sizes.Spacings.SMALL }}>
      {takes.map((id) => (
        <TakeLine key={id} id={id} />
      ))}
    </View>
  );
});

export default ExistingTakes;
