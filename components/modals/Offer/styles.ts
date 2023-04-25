import { Theme } from "constants/Colors";
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
      flexDirection: "row",
      backgroundColor: colors.Backgrounds.secondary,
      justifyContent: "center",
    },
    line: {
      display: "flex",
      flexDirection: "row",
      padding: Sizes.Spacings.SMALL,
      paddingTop: 0,
    },
    summary: {
      paddingTop: Sizes.Spacings.SMALL,
      borderColor: colors.Borders.default,
      borderWidth: 1,
      backgroundColor: colors.Backgrounds.empty,
      borderRadius: Sizes.CURVED_BORDER,
      marginBottom: Sizes.Spacings.STANDARD,
    },
    body: {
      padding: Sizes.Spacings.LARGE,
      paddingTop: Sizes.Spacings.STANDARD,
    },
  });
};
