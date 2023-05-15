import Colors, { AppColor, Theme } from "constants/Colors";
import { StyleSheet } from "react-native";
import { Sizes } from "styles/sizes";

interface IStyles {
  confirmed?: boolean;
  characterColor?: AppColor;
}
export const generateStyles = (colors: Theme, props?: IStyles) => {
  const { confirmed, characterColor } = props ?? {};
  return StyleSheet.create({
    page: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      flexGrow: 1,
      overflow: "hidden",
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
      flexGrow: 1,
      overflow: "hidden",
      flexShrink: 1,
      display: "flex",
      flexDirection: "column",
    },
    characterSet: {
      backgroundColor: colors.Backgrounds.default,
      padding: 2,
      paddingBottom: 0,
      marginBottom: Sizes.Spacings.STANDARD,
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
      backgroundColor: characterColor ?? colors.Backgrounds.primary,
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
    charactersHeader: {
      marginBottom: 2,
      padding: Sizes.Spacings.SMALL,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    nonCharacterSection: {
      backgroundColor: colors.Backgrounds.empty,
      marginBottom: 2,
      padding: Sizes.Spacings.SMALL,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    scrollable: {
      padding: Sizes.Spacings.STANDARD,
    },
    scriptPreview: {
      backgroundColor: colors.Backgrounds.default,
      padding: 2,
      paddingBottom: 0,
      marginBottom: Sizes.Spacings.STANDARD,
    },
    scriptLine: {
      backgroundColor: characterColor ?? colors.Backgrounds.primary,
      marginBottom: 2,
    },
    lineTextHolder: {
      padding: Sizes.Spacings.SMALL,
    },
    lineCharacter: {
      backgroundColor: "#fff2",
      padding: Sizes.Spacings.SMALL,
      borderBottomWidth: 1,
    },
    button: {
      margin: Sizes.Spacings.STANDARD,
    },
  });
};
