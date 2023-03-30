import { Platform, StyleSheet } from "react-native";
import { Theme } from "../../constants/Colors";
import { Sizes } from "../../styles/sizes";

interface IStyles {
  isMobile?: boolean;
}
export const generateStyles = (colors: Theme, props?: IStyles) => {
  const { isMobile } = props ?? {};
  return StyleSheet.create({
    header: {
      display: "flex",
      borderBottomWidth: 2,
      padding: Sizes.Spacings.STANDARD,
      backgroundColor: isMobile
        ? colors.Backgrounds.secondary
        : colors.Backgrounds.primary,
    },
    projectCard: {
      padding: Sizes.Spacings.STANDARD,
      borderBottomWidth: 2,
      backgroundColor: colors.Backgrounds.contrast,
      display: "flex",
      flexDirection: "row",
    },
    pageNameAndIcon: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    section: {},
  });
};
