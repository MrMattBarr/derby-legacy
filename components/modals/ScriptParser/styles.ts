import Colors, { Theme } from "constants/Colors";
import { StyleSheet } from "react-native";
import { Sizes } from "styles/sizes";

interface IStyles {}
export const generateStyles = (colors: Theme, props?: IStyles) => {
  const {} = props ?? {};
  return StyleSheet.create({
    page: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    headerBar: {
      padding: Sizes.Spacings.SMALL,
      display: "flex",
      borderTopLeftRadius: Sizes.VERY_CURVED_BORDER,
      borderTopRightRadius: Sizes.VERY_CURVED_BORDER,
      borderColor: colors.Borders.default,
      flexDirection: "row",
      backgroundColor: colors.Backgrounds.secondary,
      justifyContent: "center",
    },
    body: {
      padding: Sizes.Spacings.STANDARD,
    },
    characterSet: {
      backgroundColor: colors.Backgrounds.default,
      padding: 2,
      paddingBottom: 0,
    },
    titleText: {
      color: colors.Text.default,
      fontWeight: "bold",
      fontSize: Sizes.Fonts.HEADER,
    },
    smallText: {
      color: colors.Text.subtle,
    },
    characterLine: {
      backgroundColor: colors.Backgrounds.primary,
      marginBottom: 2,
      padding: Sizes.Spacings.SMALL,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    buttons: {
      display: "flex",
      flexDirection: "row",
    },
    nonCharacterSection: {
      backgroundColor: colors.Backgrounds.empty,
      marginBottom: 2,
      padding: Sizes.Spacings.SMALL,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
};
