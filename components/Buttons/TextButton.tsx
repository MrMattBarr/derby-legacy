import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useColors } from "../../hooks/useColorScheme";
import textStyles from "../../styles/text";
import { Text } from "../Themed";
import { generateStyles } from "./styles";

interface ITextButton {
  fontSize?: number;
  onPress: () => void;
  label: string;
}

const TextButton = ({ fontSize, onPress, label }: ITextButton) => {
  const colors = useColors();
  const styles = generateStyles(colors, { fontSize });
  const { h3 } = textStyles(colors);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.textButton}
      onPress={onPress}
    >
      <Text style={h3}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
