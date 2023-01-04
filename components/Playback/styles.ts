import { Platform, StyleSheet } from "react-native";
import { Theme } from "../../constants/Colors";
import { Sizes } from "../../styles/sizes";

export const generateStyles = (colors: Theme) => {
  return StyleSheet.create({
    holder: {
      position: "absolute",
      width: "100%",
      display: "flex",
      overflow: "hidden",
      ...Platform.select({
        web: {
          bottom: Sizes.Spacings.STANDARD,
        },
        native: {
          bottom: Sizes.PHONE_BOTTOM_NAV,
        },
      }),
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
    playbackModal: {
      margin: Sizes.Spacings.SMALL,
      backgroundColor: colors.Backgrounds.playback,
      flexGrow: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderRadius: Sizes.CURVED_BORDER,
      borderWidth: 1,
      borderColor: colors.Borders.default,
      ...Platform.select({
        web: {
          maxHeight: 100,
        },
        native: {
          maxHeight: 70,
        },
      }),
    },
  });
};
