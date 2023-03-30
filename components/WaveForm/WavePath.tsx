import { AppColor } from "constants/Colors";
import { useColors } from "hooks/useColorScheme";
import React from "react";
import { View } from "react-native";
import Svg, { Polyline } from "react-native-svg";
import { generateStyles } from "./styles";

const WavePath = () => {
  const colors = useColors();
  const { wavePath, polyline } = generateStyles(colors);

  const amplitudes = [
    0.2, 0.24, 0.3, 0.6, 0.9, 0.24, 0.23, 0.02, 0.02, 0.02, 0.02, 0.02, 0.2,
    0.24, 0.3, 0.6, 0.1, 0.24, 0.23, 0.02, 0.02, 0.02, 0.02, 0.02, 0.2, 0.24,
    0.3, 0.6, 0.9, 0.24, 0.23, 0.02, 0.02, 0.02, 0.02, 0.02, 0.2, 0.24, 0.3,
    0.6, 0.9, 0.24, 0.23, 0.02, 0.02, 0.02, 0.02, 0.02, 0.2, 0.24, 0.3, 0.6,
    0.9, 0.24, 0.23, 0.02, 0.02, 0.02, 0.02, 0.02, 0.2, 0.24, 0.3, 0.6, 0.9,
    0.24, 0.23, 0.02, 0.02, 0.02, 0.02, 0.02, 0.2, 0.24, 0.3, 0.6, 0.9, 0.24,
    0.23, 0.02, 0.02, 0.02, 0.02, 0.02, 0.2, 0.24, 0.3, 0.6, 0.9, 0.24, 0.23,
    0.02, 0.02, 0.02, 0.02, 0.02, 0.2, 0.24, 0.3, 0.6, 0.9, 0.24, 0.23, 0.02,
    0.02, 0.02, 0.02, 0.02,
  ];

  const MAX_BOX_LENGTH = 1;
  const stepSize = MAX_BOX_LENGTH / amplitudes.length;
  const halfStepSize = stepSize / 2;

  let points: number[] = [];
  let currentY = 0;

  const convertAmp = (original: number) => {
    return 0.5 + original / 2;
  };

  amplitudes.forEach((amp) => {
    points.push(currentY);
    points.push(convertAmp(amp));
    currentY += halfStepSize;
    points.push(currentY);
    points.push(convertAmp(-amp));
    currentY += halfStepSize;
  });

  return (
    <View style={wavePath}>
      <Svg
        viewBox={`0 0 1 ${MAX_BOX_LENGTH}`}
        style={polyline}
        preserveAspectRatio="none"
      >
        <Polyline
          points={points}
          fill={AppColor.TRANSPARENT}
          stroke={colors.Player.waveform}
          strokeWidth={MAX_BOX_LENGTH / 700}
        />
      </Svg>
    </View>
  );
};

export default WavePath;
