import { Platform, StyleSheet } from "react-native";
import { DefaultColors, Theme } from "../../constants/Colors";
import { Sizes } from "../../styles/sizes";

export const generateStyles = (colors: Theme) => {
  return StyleSheet.create({
    userCard: {
      padding: Sizes.Spacings.STANDARD,
      borderRadius: Sizes.CURVED_BORDER,
      margin: Sizes.Spacings.STANDARD,
      backgroundColor: colors.Backgrounds.secondary,
      borderWidth: 2,
      display: "flex",
      flexDirection: "row",
    },
    userSummary: {
      marginLeft: Sizes.Spacings.LARGE,
    },
    username: {
      color: colors.Text.default,
      fontSize: Sizes.Fonts.HEADER,
      fontWeight: "bold",
    },
    tags: {
      color: colors.Text.default,
      fontSize: Sizes.Fonts.DFEAULT,
    },
    favoriteTape: {
      display: "flex",
      alignItems: "center",
      backgroundColor: colors.Backgrounds.empty,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.Borders.default,
    },
  });
};
