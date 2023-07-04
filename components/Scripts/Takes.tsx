import Nothing from "components/Nothing";
import PlaybackView from "components/modals/Recording/PlaybackView";
import useLine from "contexts/LineContext";
import { TakeProvider } from "contexts/TakeContext";
import { useColors } from "hooks/useColorScheme";
import { observable } from "mobx";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useTakes } from "stores/TakesStore";
import { Sizes } from "styles/sizes";
import { LoadableSound } from "types/AudioMetadata";
import { ApprovalStatus } from "types/Take";
import Take from "./Take";

const labelByStatus = {
  [ApprovalStatus.UNHEARD]: "New Take",
  [ApprovalStatus.HEARD]: "Submitted Take",
  [ApprovalStatus.REJECTED]: "Rejected Take",
  [ApprovalStatus.APPROVED]: "Approved Take",
};

const Takes = observable(() => {
  const { line } = useLine();
  const takeIds = line?.takes ?? [];
  const colors = useColors();

  if (!takeIds || takeIds.length === 0) {
    return <Nothing />;
  }
  console.log(takeIds);
  return (
    <TakeProvider id={takeIds[0]}>
      <Take />
    </TakeProvider>
  );
});
export default Takes;
