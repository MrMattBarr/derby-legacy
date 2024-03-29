import Colors, { Theme } from "constants/Colors";
import { StyleSheet } from "react-native";
import { Sizes } from "styles/sizes";

interface IStyles {
  isOwner?: boolean;
}
export const generateStyles = (colors: Theme, props?: IStyles) => {
  const { isOwner } = props ?? {};
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
      flexDirection: "row",
      backgroundColor: isOwner
        ? colors.Backgrounds.secondary
        : colors.Backgrounds.complete,
      justifyContent: "center",
    },
    line: {
      display: "flex",
      flexDirection: "row",
      padding: Sizes.Spacings.SMALL,
      paddingTop: 0,
    },
    element: {
      marginBottom: Sizes.Spacings.LARGE,
    },
    description: {
      padding: Sizes.Spacings.STANDARD,
      borderColor: colors.Borders.default,
      borderWidth: 1,
      borderRadius: Sizes.CURVED_BORDER,
      backgroundColor: colors.Backgrounds.empty,
      marginBottom: Sizes.Spacings.LARGE,
      paddingTop: Sizes.Spacings.STANDARD,
    },
    body: {
      padding: Sizes.Spacings.LARGE,
    },
    selfRoleButton: {
      color: colors.Text.complete,
    },
    cancelButton: {
      color: colors.Text.error,
    },
    centered: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
  });
};
