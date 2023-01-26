import { Platform, StyleSheet } from "react-native";
import { Theme } from "../../constants/Colors";
import { Sizes } from "../../styles/sizes";

interface IStyles {
  isMobile?: boolean;
}

export const generateStyles = (colors: Theme, props?: IStyles) => {
  const { isMobile } = props ?? {};

  return StyleSheet.create({
    holder: {
      position: "absolute",
      width: "100%",
      padding: Sizes.Spacings.SMALL,
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
      overflow: "hidden",
      bottom: isMobile ? Sizes.PHONE_BOTTOM_NAV : Sizes.Spacings.STANDARD,
    },
    stack: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    horizontal: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      flexGrow: 1,
    },
    content: {
      margin: Sizes.Spacings.STANDARD,
    },
    playback: {
      backgroundColor: colors.Backgrounds.playback,
      flexGrow: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      maxWidth: isMobile ? undefined : Sizes.Pages.WEB,
      borderRadius: Sizes.CURVED_BORDER,
      borderWidth: 1,
      overflow: "hidden",
      borderColor: colors.Borders.default,
    },
  });
};
