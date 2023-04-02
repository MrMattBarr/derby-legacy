import { View } from "components/Themed";
import { useColors } from "hooks/useColorScheme";
import React from "react";
import { AudioMetaData } from "types/AudioMetadata";
import WavePath from "./WavePath";
import { generateStyles } from "./styles";

const WaveForm = ({ meters }: { meters: number[] }) => {
  const colors = useColors();
  const { waveForm } = generateStyles(colors);

  return (
    <View style={waveForm}>
      <WavePath meters={meters} />
    </View>
  );
};

export default WaveForm;
