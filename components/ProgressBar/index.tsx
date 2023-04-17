import { useColors } from "hooks/useColorScheme";
import React from "react";
import { View } from "react-native";
import { generateStyles } from "./styles";

interface IProgressBar {
  percent: number;
}

const ProgressBar = ({ percent }: IProgressBar) => {
  const colors = useColors();
  const unfinished = 1 - percent;
  const { progressBar, complete, incomplete } = generateStyles(colors);
  return (
    <View style={progressBar}>
      <View style={{ ...complete, flexGrow: percent }} />
      <View style={{ ...incomplete, flexGrow: unfinished }} />
    </View>
  );
};

export default ProgressBar;
