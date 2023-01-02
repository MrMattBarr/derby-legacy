import { StyleSheet } from "react-native";
import { Theme } from "../constants/Colors";

const textStyles = (colors: Theme) => {
  const defaultText = { color: colors.Text.default };
  return StyleSheet.create({
    h1: {
      ...defaultText,
      fontSize: 30,
    },
    h2: {
      ...defaultText,
      fontSize: 20,
      fontWeight: "600",
    },
    text: {
      ...defaultText,
    },
  });
};

export default textStyles;
