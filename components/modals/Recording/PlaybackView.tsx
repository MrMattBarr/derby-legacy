import { observer } from "mobx-react";
import React from "react";
import { Text, View } from "react-native";
import usePlayback from "../../../contexts/PlaybackContext";
import { useColors } from "../../../hooks/useColorScheme";
import { Sizes } from "../../../styles/sizes";
import { readableDuration } from "../../../utils/utils";
import Playback from "../../Playback";
import { generateStyles } from "./styles";

const PlaybackView = observer(() => {
  const playbackStore = usePlayback();
  const duration = readableDuration(playbackStore.duration);
  const colors = useColors();
  const { playback, playbackTitle, detail, playbackHolder } =
    generateStyles(colors);

  return (
    <View style={playbackHolder}>
      <Playback style={{ marginVertical: Sizes.Spacings.STANDARD }}>
        <View style={playback}>
          <Text style={playbackTitle}>New Recording</Text>
          <Text style={detail}>{duration}</Text>
        </View>
      </Playback>
    </View>
  );
});
export default PlaybackView;