import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { AppColor } from "../constants/Colors";
import { useColors } from "../hooks/useColorScheme";
import { Sizes } from "../styles/sizes";
import Spinner from "./Spinner";
import App from "App";

export interface IIconButton {
  size?: number;
  style?: object;
  onPress: () => void;
  loading?: boolean;
  icon: string;
  color?: AppColor;
  background?: AppColor;
  border?: AppColor;
  label?: string;
}

const IconButton = ({
  size,
  onPress,
  icon,
  style,
  color,
  loading,
  border,
  background,
}: IIconButton) => {
  const finalSize = size ?? 50;
  const colors = useColors();
  const foreground = loading
    ? colors.Text.subtle
    : color ?? colors.Buttons.foreground;
  const styles = StyleSheet.create({
    appButton: {
      fontSize: 12,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderColor: border ?? colors.Buttons.foreground,
      borderRadius: finalSize,
      borderWidth: 1,
      backgroundColor: loading ? colors.Backgrounds.empty : background ?? "",
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
      {!loading && (
        <Entypo name={icon as any} size={finalSize * 0.5} color={foreground} />
      )}
      {loading && (
        <Spinner size={finalSize * 0.75} color={foreground} spinning />
      )}
    </TouchableOpacity>
  );
};

export default IconButton;
