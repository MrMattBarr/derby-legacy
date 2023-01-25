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
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 2,
      padding: 10,
      backgroundColor: isMobile
        ? colors.Backgrounds.secondary
        : colors.Backgrounds.empty,
    },
    list: { flex: 1 },
    pageNameAndIcon: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    spot: {
      padding: Sizes.Spacings.STANDARD,
      borderBottomWidth: 1,
      borderBottomColor: colors.Borders.default,
    },
    spotTitle: {
      color: colors.Text.default,
      fontSize: Sizes.Fonts.HEADER,
    },
    section: {},
    pageName: {
      marginRight: 30,
    },
  });
};