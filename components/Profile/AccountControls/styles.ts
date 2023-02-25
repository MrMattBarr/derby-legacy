import { Platform, StyleSheet } from "react-native";
import { Theme } from "../../../constants/Colors";
import { Sizes } from "../../../styles/sizes";

export const generateStyles = (colors: Theme) => {
  return StyleSheet.create({
    holder: {
      padding: Sizes.Spacings.STANDARD,
      backgroundColor: colors.Backgrounds.primary,
      borderColor: colors.Borders.default,
      borderBottomWidth: 1,
    },
    headerHolder: {
      marginBottom: Sizes.Spacings.STANDARD,
    },
    header: {
      color: colors.Text.subtle,
      fontSize: Sizes.Fonts.HEADER,
    },
  });
};
