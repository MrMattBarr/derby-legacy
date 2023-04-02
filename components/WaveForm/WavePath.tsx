import { AppColor } from "constants/Colors";
import { useColors } from "hooks/useColorScheme";
import React from "react";
import { View } from "react-native";
import Svg, { Polyline } from "react-native-svg";
import { generateStyles } from "./styles";

interface IWavePath {
  meters?: number[];
}
const WavePath = ({ meters }: IWavePath) => {
  const colors = useColors();
  const { wavePath, polyline } = generateStyles(colors);

  const adjustedMeters = (meters ?? [])
    .filter((x) => x > -100)
    .map((level) => {
      return level + 160;
    });

  const max = Math.max(...adjustedMeters);
  const min = Math.min(...adjustedMeters.filter((x) => x > 0));
  const range = max - min;

  const normalizedMeters = adjustedMeters
    .map((x) => {
      if (x === 0) {
        return 0;
      }
      return (x - min) / range;
    })
    .slice(20);

  const MAX_BOX_LENGTH = 1;
  const stepSize = MAX_BOX_LENGTH / normalizedMeters.length;
  const halfStepSize = stepSize / 2;

  let points: number[] = [];
  let currentY = 0;

  const convertAmp = (original: number) => {
    return 0.5 + original / 2;
  };

  normalizedMeters.forEach((amp) => {
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
