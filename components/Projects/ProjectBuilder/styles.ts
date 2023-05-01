import { Theme } from "constants/Colors";
import { StyleSheet } from "react-native";
import { Sizes } from "styles/sizes";

interface IStyles {}
export const generateStyles = (colors: Theme, props?: IStyles) => {
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
  });
};
