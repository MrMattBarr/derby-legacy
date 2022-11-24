import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useColors } from "../hooks/useColorScheme";
import { Text } from "./Themed";

interface ITextButton {
  fontSize?: number;
  onPress: () => void;
  label: string;
}

const TextButton = ({ fontSize, onPress, label }: ITextButton) => {
  const finalSize = fontSize ?? 12;
  const styles = StyleSheet.create({
    appButton: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      fontSize: finalSize,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      backgroundColor: "transparent",
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.appButton}
      onPress={onPress}
    >
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
