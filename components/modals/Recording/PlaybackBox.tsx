import React from "react";
import { View } from "react-native";
import { useColors } from "../../../hooks/useColorScheme";
import Nothing from "../../Nothing";
import useRecordingBooth from "./context";
import Prompt from "./Prompt";
import Review from "./Review";
import Spinner from "./Spinner";
import { generateStyles } from "./styles";

const PlaybackBox = () => {
  const colors = useColors();
  const { playbackBox, holder } = generateStyles(colors);
  const { recording, audio } = useRecordingBooth();
  let Content = Nothing;

  const showPrompts = recording === undefined && audio === undefined;
  const showReview = !!audio;
  if (showPrompts) {
    Content = Prompt;
  } else if (showReview) {
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
};
export default PlaybackBox;
