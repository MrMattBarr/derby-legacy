import { Platform, StyleSheet } from "react-native";
import { Theme } from "../../../constants/Colors";

export const generateStyles = (colors: Theme) => {
  const GEAR_SIZE = 30;
  const GEAR_PADDING = 10;
  return StyleSheet.create({
    gear: {
      height: GEAR_SIZE,
      borderRadius: GEAR_SIZE,
      width: GEAR_SIZE,
      padding: 10,
      backgroundColor: "red",
    },
  });
};
