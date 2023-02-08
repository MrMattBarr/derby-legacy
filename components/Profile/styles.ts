import { StyleSheet } from "react-native";
import { Theme } from "../../constants/Colors";
import { Sizes } from "../../styles/sizes";

export const generateStyles = (colors: Theme) => {
  return StyleSheet.create({
    userCard: {
      padding: Sizes.Spacings.STANDARD,
      backgroundColor: colors.Backgrounds.contrast,
      display: "flex",
      flexDirection: "row",
    },
    page: {
      borderRadius: Sizes.CURVED_BORDER,
      margin: Sizes.Spacings.STANDARD,
      backgroundColor: colors.Backgrounds.empty,
      borderWidth: 2,
      overflow: "hidden",
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
      borderTopWidth: 2,
      borderBottomWidth: 1,
      borderColor: colors.Borders.default,
    },
    rates: {
      fontSize: Sizes.Fonts.DFEAULT,
      color: colors.Text.default,
      textDecorationLine: "underline",
    },
  });
};
