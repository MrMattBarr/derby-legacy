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
      flexDirection: "row",
      borderBottomWidth: 2,
      padding: Sizes.Spacings.STANDARD,
      paddingTop: 0,
      backgroundColor: isMobile
        ? colors.Backgrounds.secondary
        : colors.Backgrounds.primary,
    },
    barHolder: {
      marginTop: Sizes.Spacings.SMALL,
    },
    projectCard: {
      padding: Sizes.Spacings.STANDARD,
      borderBottomWidth: 2,
      backgroundColor: colors.Backgrounds.primary,
      display: "flex",
      flexDirection: "row",
    },
    content: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
    },
    pageNameAndIcon: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    section: {},
  });
};
