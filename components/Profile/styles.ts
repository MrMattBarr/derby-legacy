import { StyleSheet } from "react-native";
import { Theme } from "../../constants/Colors";
import { Sizes } from "../../styles/sizes";

export const generateStyles = (colors: Theme) => {
  return StyleSheet.create({
    userCard: {
      padding: Sizes.Spacings.STANDARD,
      borderTopWidth: 2,
      borderBottomWidth: 2,
      backgroundColor: colors.Backgrounds.contrast,
      display: "flex",
      flexDirection: "row",
    },
    page: {
      backgroundColor: colors.Backgrounds.secondary,
      borderBottomWidth: 1,
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
      flexDirection: "row",
      overflow: "hidden",
      justifyContent: "center",
      borderColor: colors.Borders.default,
    },
    rates: {
      fontSize: Sizes.Fonts.DFEAULT,
      color: colors.Text.default,
      textDecorationLine: "underline",
    },
  });
};
