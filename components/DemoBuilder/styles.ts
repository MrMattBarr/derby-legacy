import { Platform, StyleSheet } from "react-native";
import { DefaultColors, Theme } from "../../constants/Colors";

export const generateStyles = (colors: Theme) => {
  const commonControl = {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.Borders.dramatic,
    paddingVertical: 5,
    paddingHorizontal: 10,
  };

  return StyleSheet.create({
    titleInput: {
      ...commonControl,
      fontSize: 20,
      color: colors.Text.default,
      backgroundColor: colors.Backgrounds.inputs,
      placeholderTextColor: colors.Text.placeholder,
    },
    summaryInput: {
      ...commonControl,
      color: colors.Text.default,
      backgroundColor: colors.Backgrounds.inputs,
      placeholderTextColor: colors.Text.placeholder,
    },
    overview: {
      ...commonControl,
      backgroundColor: colors.Backgrounds.secondary,
    },
    control: {
      marginBottom: 20,
    },
  });
};
