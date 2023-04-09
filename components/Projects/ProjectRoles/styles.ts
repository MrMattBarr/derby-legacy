import { Theme } from "constants/Colors";
import { StyleSheet } from "react-native";
import { Sizes } from "styles/sizes";

interface IStyles {
  isMobile?: boolean;
}
export const generateStyles = (colors: Theme, props?: IStyles) => {
  const { isMobile } = props ?? {};
  return StyleSheet.create({
    roleLine: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 2,
      padding: Sizes.Spacings.STANDARD,
      backgroundColor: colors.Backgrounds.secondary,
    },
    rolesContainer: {
      backgroundColor: colors.Borders.default,
      padding: 2,
      paddingBottom: 0,
    },
    uncastAvatar: {
      width: 60,
      height: 60,
      borderColor: colors.Borders.default,
      borderWidth: 2,
      borderRadius: 55,
      marginRight: Sizes.Spacings.STANDARD,
      borderStyle: "dashed",
    },
  });
};
