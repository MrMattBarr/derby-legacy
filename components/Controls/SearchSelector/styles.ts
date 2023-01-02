import { Platform, StyleSheet } from "react-native";
import { Theme } from "../../../constants/Colors";

export const generateStyles = (colors: Theme) => {
  return StyleSheet.create({
    defaultStyle: {
      fontSize: 20,
      borderWidth: 1,
      overflow: "hidden",
      borderColor: colors.Borders.dramatic,
      color: colors.Text.default,
      backgroundColor: colors.Backgrounds.secondary,
    },
    defaultInputStyle: {
      fontSize: 20,
      borderBottomWidth: 1,
      borderColor: colors.Borders.dramatic,
      paddingVertical: 5,
      paddingHorizontal: 10,
      color: colors.Text.default,
      backgroundColor: colors.Backgrounds.inputs,
      placeholderColor: colors.Text.placeholder,
    },
  });
};
