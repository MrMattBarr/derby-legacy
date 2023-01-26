import { StyleSheet } from "react-native";
import { Theme } from "../../../constants/Colors";
import { Sizes } from "../../../styles/sizes";

export const generateStyles = (colors: Theme) => {
  const commonControl = {
    borderWidth: 1,
    borderRadius: Sizes.CURVED_BORDER,
    borderColor: colors.Borders.dramatic,
    paddingVertical: 5,
    paddingHorizontal: 10,
  };
  return StyleSheet.create({
    header: {
      color: colors.Text.default,
      fontSize: Sizes.Fonts.HEADER,
    },
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
