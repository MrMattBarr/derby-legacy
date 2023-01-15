import React from "react";
import { Text, View } from "react-native";
import { useColors } from "../../../hooks/useColorScheme";
import useRecordingBooth from "./context";
import PlaybackButton from "./PlaybackButton";
import { generateStyles } from "./styles";

const PlaybackBox = () => {
  const colors = useColors();
  const { playbackBox, header, detail } = generateStyles(colors);
  const { recording, audio } = useRecordingBooth();
  const headerText = "Hold the button to record";
  const detailText =
    "You can do as many retakes as you need. Remember to breathe and take your time. You'll do your best work when you're comfortable with the script and yourself. \n\nWhen you're finished, you can review your recording here.";

  const showPrompts = recording === undefined && audio === undefined;

  return (
    <View
      style={{
        ...playbackBox,
        backgroundColor: recording
          ? colors.Backgrounds.playback
          : colors.Backgrounds.empty,
      }}
    >
      {showPrompts && (
        <>
          <Text style={header}>{headerText}</Text>
          <Text style={detail}>{detailText}</Text>
        </>
      )}
      <PlaybackButton />
    </View>
  );
};
export default PlaybackBox;
