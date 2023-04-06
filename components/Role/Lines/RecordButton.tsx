import BigButton from "components/Buttons/BigButton";
import useRecordingBooth, {
  RecordingBoothProvider,
  RecordingState,
} from "components/modals/Recording/context";
import PlaybackView from "components/modals/Recording/PlaybackView";
import Nothing from "components/Nothing";
import { AppColor } from "constants/Colors";
import useClient from "contexts/ClientContext";
import * as Haptics from "expo-haptics";
import React from "react";
import { StyleSheet } from "react-native";
import RecordingPreviewButtons from "./RecordingPreviewButton";
import useLine from "contexts/LineContext";

const WrappedButton = () => {
  const {
    startRecording,
    stopRecording,
    error,
    recordingState,
    metadata,
    sound,
  } = useRecordingBooth();
  const ON_COLOR = AppColor.CHALK_RED;
  const OFF_COLOR = AppColor.PURE_BLACK;
  const { isApp } = useClient();
  const { line } = useLine();
  if (error) {
    return <Nothing />;
  }
  const styles = StyleSheet.create({
    appButton: {
      borderColor:
        recordingState === RecordingState.RECORDING ? ON_COLOR : AppColor.SLATE,
      backgroundColor:
        recordingState === RecordingState.RECORDING ? ON_COLOR : OFF_COLOR,
      width: "100%",
    },
  });

  const hapticStart = () => {
    startRecording();
    if (isApp) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  if (recordingState === RecordingState.REVIEW) {
    const title = `Take ${(line?.takes?.length ?? 0) + 1}`;
    return (
      <PlaybackView
        metadata={metadata}
        loadable={sound}
        Buttons={RecordingPreviewButtons}
        title={title}
      />
    );
  }

  return (
    <BigButton
      style={styles.appButton}
      onPressIn={hapticStart}
      onPressOut={stopRecording}
      icon="mic"
      label="Record"
    />
  );
};
const RecordButton = () => {
  return (
    <RecordingBoothProvider>
      <WrappedButton />
    </RecordingBoothProvider>
  );
};

export default RecordButton;
