import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme, { useColors } from "../hooks/useColorScheme";
import * as Haptics from "expo-haptics";
import { Sizes } from "../styles/sizes";

interface IToggleButton {
  isActive?: boolean;
  onToggle?: () => void;
  InactiveIcon: () => JSX.Element;
  ActiveIcon: () => JSX.Element;
}

export default function ToggleButton({
  onToggle,
  isActive,
  InactiveIcon,
  ActiveIcon,
}: IToggleButton) {
  const colors = useColors();
  const happyHaptic = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };
  const styles = StyleSheet.create({
    button: {
      borderWidth: 1,
      borderColor: colors.Buttons.foreground,
      borderRadius: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 50,
      height: 50,
      margin: Sizes.Spacings.STANDARD,
      color: colors.Buttons.foreground,
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.button}
      onPress={() => {
        if (onToggle) onToggle();
        happyHaptic;
        return true;
      }}
    >
      {!isActive && <InactiveIcon />}
      {isActive && <ActiveIcon />}
    </TouchableOpacity>
  );
}
