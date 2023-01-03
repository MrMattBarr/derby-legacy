import { StyleSheet } from "react-native";
import { Theme } from "../constants/Colors";

const textStyles = (colors: Theme) => {
  const defaultText = { color: colors.Text.default, fontSize: 12 };
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
    h3: {
      ...defaultText,
      fontWeight: "600",
      fontSize: 18,
    },
    text: {
      ...defaultText,
    },
  });
};

export default textStyles;
