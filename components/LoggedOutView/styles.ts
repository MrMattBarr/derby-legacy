import { StyleSheet } from "react-native";
import { Theme } from "../../constants/Colors";
import { Sizes } from "../../styles/sizes";

export const generateStyles = (colors: Theme) => {
  return StyleSheet.create({
    outer: {
      flexGrow: 1,
      padding: Sizes.Spacings.LARGE,
      alignItems: "center",
      display: "flex",
      justifyContent: "space-around",
      flexDirection: "column",
    },
    bottomPadding: {
      flexGrow: 1,
    },
    view: {
      flexGrow: 1,
      backgroundColor: colors.Backgrounds.secondary,
    },
    appName: {
      fontSize: 40,
      fontFamily: "Slab",
      color: `rgb(128,128,109)`,
    },
    logo: {
      padding: Sizes.Spacings.STANDARD,
      backgroundColor: colors.Backgrounds.secondary,
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
    },
    buttonHolder: {
      alignSelf: "stretch",
    },
    tagline: {
      fontSize: Sizes.Fonts.HEADER,
      color: colors.Text.default,
      fontFamily: "Kalam",
    },
  });
};
