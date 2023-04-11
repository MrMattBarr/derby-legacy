import { useColors } from "hooks/useColorScheme";
import React from "react";
import { View } from "react-native";
import { generateStyles } from "./styles";

interface IProgressBar {
  percent: number;
}

const ProgressBar = () => {
  const colors = useColors();
  const { progressBar } = generateStyles(colors);
  return <View style={progressBar} />;
};

export default ProgressBar;
