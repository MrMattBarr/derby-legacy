import { Platform, StyleSheet } from "react-native";
import { Theme } from "../../constants/Colors";
import { Sizes } from "../../styles/sizes";

export const generateStyles = (colors: Theme) => {
  return StyleSheet.create({
    player: {
      ...Platform.select({
        web: {
          padding: 10,
          marginBottom: 20,
        },
        native: {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          width: "100%",
        },
      }),
      borderColor: colors.Borders.default,
      borderWidth: 3,
      flexGrow: 0,
      borderRadius: 10,
      backgroundColor: colors.Backgrounds.default,
      display: "flex",
    },
    holder: {
      display: "flex",
      alignSelf: "center",
      flexDirection: "column",
    },
    trackList: {
      overflow: "hidden",
      padding: Sizes.Spacings.STANDARD,
      width: "100%",
      maxWidth: Sizes.ContentWidths.CENTER,
    },
    listHolder: {
      borderRadius: Sizes.CURVED_BORDER,
      borderColor: colors.Borders.default,
      backgroundColor: colors.Backgrounds.empty,
      borderWidth: 2,
    },
  });
};
