import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { AppColor } from "../constants/Colors";
import { useColors } from "../hooks/useColorScheme";
import { Sizes } from "../styles/sizes";

export interface IIconButton {
  size?: number;
  style?: object;
  onPress: () => void;
  icon: string;
  color?: AppColor;
  background?: AppColor;
  border?: AppColor;
  label?: string;
}

const PlayerButton = ({
  size,
  onPress,
  icon,
  style,
  color,
  border,
  background,
}: IIconButton) => {
  const finalSize = size ?? 50;
  const colors = useColors();
  const styles = StyleSheet.create({
    appButton: {
      fontSize: 12,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderColor: border ?? colors.Buttons.foreground,
      borderRadius: finalSize,
      borderWidth: 1,
      backgroundColor: background ?? "",
      width: finalSize,
      height: finalSize,
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
        size={finalSize * 0.5}
        color={color ?? colors.Buttons.foreground}
      />
    </TouchableOpacity>
  );
};

export default PlayerButton;
