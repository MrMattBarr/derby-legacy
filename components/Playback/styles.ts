import { StyleSheet } from "react-native";
import { Theme } from "../../constants/Colors";
import { Sizes } from "../../styles/sizes";

export const generateStyles = (colors: Theme) => {
  return StyleSheet.create({
    holder: {
      position: "absolute",
      bottom: Sizes.PHONE_BOTTOM_NAV,
      width: "100%",
      display: "flex",
      overflow: "hidden",
    },
    stack: {
      display: "flex",
      flexDirection: "column",
    },
    playbackModal: {
      margin: Sizes.Spacings.SMALL,
      backgroundColor: colors.Backgrounds.playback,
      height: 50,
      flexGrow: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderRadius: Sizes.CURVED_BORDER,
      paddingHorizontal: Sizes.Spacings.STANDARD,
      paddingVertical: Sizes.Spacings.SMALL,
      borderWidth: 1,
      borderColor: colors.Borders.default,
    },
  });
};
