import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import usePlayback from "../../../contexts/PlaybackContext";
import { useColors } from "../../../hooks/useColorScheme";
import Nothing from "../../Nothing";
import useRecordingBooth, { RecordingState } from "./context";
import Prompt from "./Prompt";
import Review from "./Review";
import Spinner from "./Spinner";
import { generateStyles } from "./styles";

const PlaybackBox = observer(() => {
  const colors = useColors();
  const { playbackBox, holder } = generateStyles(colors);
  const playbackStore = usePlayback();
  const audio = playbackStore.audio;
  const { recording, readyToRecord, recordingState } = useRecordingBooth();
  let Content = Nothing;

  if (readyToRecord) {
    Content = Prompt;
  } else if (recordingState === RecordingState.REVIEW) {
    Content = Review;
  }
  return (
    <View style={holder}>
      <View
        style={{
          ...playbackBox,
          backgroundColor: recording
            ? colors.Backgrounds.playback
            : colors.Backgrounds.empty,
        }}
      >
        <Spinner />
        <Content />
      </View>
    </View>
  );
});
export default PlaybackBox;
