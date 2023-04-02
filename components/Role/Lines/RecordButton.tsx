import BigButton from "components/Buttons/BigButton";
import useRecordingBooth, {
  RecordingState,
} from "components/modals/Recording/context";
import PlaybackView from "components/modals/Recording/PlaybackView";
import Nothing from "components/Nothing";
import { AppColor } from "constants/Colors";
import useClient from "contexts/ClientContext";
import useLine from "contexts/LineContext";
import * as Haptics from "expo-haptics";
import React from "react";
import { StyleSheet } from "react-native";

const RecordButton = () => {
  const { startRecording, stopRecording, error, recordingState } =
    useRecordingBooth();
  const ON_COLOR = AppColor.CHALK_RED;
  const OFF_COLOR = AppColor.PURE_BLACK;
  const { isApp } = useClient();
  const { addTake } = useLine();
  if (error) {
    return <Nothing />;
  }
  const styles = StyleSheet.create({
    appButton: {
      borderColor:
        recordingState === RecordingState.RECORDING ? ON_COLOR : AppColor.SLATE,
      backgroundColor:
        recordingState === RecordingState.RECORDING ? ON_COLOR : OFF_COLOR,
    },
  });

  const hapticStart = () => {
    startRecording();
    if (isApp) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  if (recordingState === RecordingState.REVIEW) {
    return <PlaybackView onSubmit={addTake} submitIcon="paper-plane" />;
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

export default RecordButton;
