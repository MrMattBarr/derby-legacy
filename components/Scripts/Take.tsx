import Loading from "components/Loading";
import PlaybackView from "components/modals/Recording/PlaybackView";
import useTake from "contexts/TakeContext";
import { observable } from "mobx";
import React from "react";
import { View } from "react-native";
import { Sizes } from "styles/sizes";
import { LoadableSound } from "types/AudioMetadata";
import { ApprovalStatus } from "types/Take";

const labelByStatus = {
  [ApprovalStatus.UNHEARD]: "New Take",
  [ApprovalStatus.HEARD]: "Submitted Take",
  [ApprovalStatus.REJECTED]: "Rejected Take",
  [ApprovalStatus.APPROVED]: "Approved Take",
};

const Take = observable(() => {
  const { take } = useTake();
  if (!take) {
    return <Loading />;
  }
  const sound: LoadableSound = {
    sound: take.audio!,
    metadata: take.metadata,
  };
  const hearTake = () => {};

  return (
    <View
      style={{
        margin: Sizes.Spacings.STANDARD,
        marginBottom: 0,
      }}
    >
      <PlaybackView
        onPlay={hearTake}
        title={labelByStatus[take.status]}
        metadata={take.metadata}
        loadable={sound}
      />
    </View>
  );
});
export default Take;
