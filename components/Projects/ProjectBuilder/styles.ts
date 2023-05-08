import { Theme } from "constants/Colors";
import { StyleSheet } from "react-native";
import { Sizes } from "styles/sizes";

interface IStyles {
  hasClipboardText?: boolean;
}
export const generateStyles = (colors: Theme, props?: IStyles) => {
  const { hasClipboardText } = props ?? {};
  return StyleSheet.create({
    page: {
      flexGrow: 1,
      borderTopWidth: 2,
      borderTopColor: colors.Borders.default,
      backgroundColor: colors.Backgrounds.primary,
      display: "flex",
      flexDirection: "column",
    },
    header: {
      display: "flex",
      flexDirection: "column",
      paddingTop: Sizes.Spacings.STANDARD,
      marginHorizontal: Sizes.Spacings.LARGE,
    },
    body: {
      flexGrow: 1,
      paddingHorizontal: Sizes.Spacings.LARGE,
      paddingVertical: Sizes.Spacings.STANDARD,
    },
    scriptReceiverBox: {
      borderWidth: 1,
      borderColor: colors.Borders.default,
      backgroundColor: colors.Backgrounds.empty,
      padding: Sizes.Spacings.STANDARD,
    },
    clipboardPreview: {
      overflow: "hidden",
      display: "flex",
      flexDirection: "row",
      borderWidth: 1,
      marginBottom: Sizes.Spacings.STANDARD,
      borderColor: colors.Borders.default,
      borderRadius: Sizes.CURVED_BORDER,
      backgroundColor: hasClipboardText
        ? colors.Backgrounds.secondary
        : colors.Backgrounds.empty,
    },
    iconHolder: {
      padding: Sizes.Spacings.SMALL,
      borderRightWidth: 1,
      position: "relative",
      borderColor: colors.Borders.default,
      backgroundColor: hasClipboardText
        ? colors.Backgrounds.secondary
        : colors.Backgrounds.secondary,
      borderTopLeftRadius: Sizes.CURVED_BORDER,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderBottomLeftRadius: Sizes.CURVED_BORDER,
    },
    scriptPreview: {
      padding: Sizes.Spacings.SMALL,
      backgroundColor: hasClipboardText
        ? colors.Backgrounds.complete
        : colors.Backgrounds.primary,
      display: "flex",
      flexDirection: "row",
      flexShrink: 0,
      flexGrow: 1,
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
    },
    spinnerHolder: {
      position: "absolute",
      paddingTop: 10,
      paddingRight: 7,
    },
  });
};
