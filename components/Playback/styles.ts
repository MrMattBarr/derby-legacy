import { Platform, StyleSheet } from "react-native";
import { Theme } from "../../constants/Colors";
import { Sizes } from "../../styles/sizes";

interface IStyles {
  isMobile?: boolean;
}

export const generateStyles = (colors: Theme, props?: IStyles) => {
  const { isMobile } = props ?? {};

  const webModal = {
    maxHeight: 100,
    borderRadius: 0,
    width: Sizes.Pages.WEB,
    alignSelf: "center",
    boxShadow: "0 0 10px black",
  };
  return StyleSheet.create({
    holder: {
      position: "absolute",
      width: "100%",
      display: "flex",
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
        web: isMobile ? {} : webModal,
        native: {
          maxHeight: 70,
        },
      }),
    },
  });
};
