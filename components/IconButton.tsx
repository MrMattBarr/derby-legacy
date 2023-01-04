import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useColors } from "../hooks/useColorScheme";

export interface IIconButton {
  size?: number;
  style?: object;
  onPress: () => void;
  icon: string;
  borderless?: boolean;
  label?: string;
}

const PlayerButton = ({ size, onPress, icon, style }: IIconButton) => {
  const finalSize = size ?? 50;
  const colors = useColors();
  const styles = StyleSheet.create({
    appButton: {
      fontSize: 12,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "stretch",
      ...style,
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.appButton}
      onPress={onPress}
    >
      <Entypo
        name={icon as any}
        size={finalSize * 0.65}
        color={colors.Buttons.foreground}
      />
    </TouchableOpacity>
  );
};

export default PlayerButton;
