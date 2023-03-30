import { View } from "components/Themed";
import { SoundWithDuration } from "contexts/PlaybackContext";
import { Audio } from "expo-av";
import { useColors } from "hooks/useColorScheme";
import React from "react";
import { generateStyles } from "./styles";
import WavePath from "./WavePath";

const WaveForm = ({ audio }: { audio: SoundWithDuration }) => {
  const colors = useColors();
  const { waveForm } = generateStyles(colors);

  return (
    <View style={waveForm}>
      <WavePath />
    </View>
  );
};

export default WaveForm;
