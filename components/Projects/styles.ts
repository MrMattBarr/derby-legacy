import App from "App";
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
      padding: Sizes.Spacings.STANDARD,
      backgroundColor: isMobile
        ? colors.Backgrounds.secondary
        : colors.Backgrounds.primary,
    },
    subHeader: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      padding: Sizes.Spacings.STANDARD,
      backgroundColor: colors.Backgrounds.secondary,
    },
    projectLine: {
      backgroundColor: colors.Backgrounds.primary,
      borderBottomWidth: 1,
      padding: Sizes.Spacings.STANDARD,
      paddingLeft: 0,
      paddingBottom: Sizes.Spacings.STANDARD,
      borderColor: colors.Borders.default,
      overflow: "hidden",
      display: "flex",
      flexDirection: "row",
    },
    list: { flex: 1 },
    pageNameAndIcon: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    section: {},
    pageName: {
      marginLeft: Sizes.Spacings.STANDARD,
    },
    listItem: {
      backgroundColor: colors.Backgrounds.primary,
      borderBottomWidth: 1,
      borderColor: colors.Borders.default,
      padding: Sizes.Spacings.STANDARD,
    },
    titleText: {
      color: colors.Text.default,
      fontWeight: "bold",
      fontSize: Sizes.Fonts.HEADER,
    },
    content: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    smallText: {
      color: colors.Text.subtle,
    },
    calendar: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    daysLeft: {
      color: colors.Text.subtle,
      position: "absolute",
      fontSize: Sizes.Fonts.DFEAULT,
      top: 17,
    },
  });
};
