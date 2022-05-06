import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

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
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    button: {
      borderWidth: 1,
      borderRadius: 50,
      marginRight: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 50,
      height: 50,
      backgroundColor: Colors[colorScheme!].brandBackground,
      color: Colors[colorScheme!].text,
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.button}
      onPress={() => {
        if (onToggle) onToggle();
        return true;
      }}
    >
      {!isActive && <InactiveIcon />}
      {isActive && <ActiveIcon />}
    </TouchableOpacity>
  );
}
