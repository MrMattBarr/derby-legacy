import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useColors } from "../../hooks/useColorScheme";
import textStyles from "../../styles/text";
import { Text } from "../Themed";
import { generateStyles } from "./styles";

interface ITextButton {
  fontSize?: number;
  danger?: boolean;
  onPress: () => void;
  label: string;
}

const TextButton = ({ fontSize, onPress, label, danger }: ITextButton) => {
  const colors = useColors();
  const styles = generateStyles(colors, { fontSize, danger });
  const { h3 } = textStyles(colors);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.textButton}
      onPress={onPress}
    >
      <Text style={[h3, styles.textButtonText]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
