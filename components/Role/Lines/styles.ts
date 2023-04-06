import App from "App";
import { AppColor, Theme } from "constants/Colors";
import { StyleSheet } from "react-native";
import { Sizes } from "styles/sizes";

interface IStyles {
  expanded?: boolean;
  complete?: boolean;
}
export const generateStyles = (colors: Theme, props?: IStyles) => {
  const { expanded, complete } = props ?? {};
  return StyleSheet.create({
    listItem: {
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
    titleText: {
      color: colors.Text.default,
      fontWeight: "bold",
      fontSize: expanded ? 26 : Sizes.Fonts.HEADER,
    },
    takeName: {
      color: colors.Text.default,
      fontWeight: "bold",
      fontSize: expanded ? 26 : Sizes.Fonts.HEADER,
    },
    content: {
      flexGrow: 1,
      flexShrink: 1,
      overflow: "hidden",
      position: "relative",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      overflow: "hidden",
    },
    headerText: {
      flexGrow: 1,
      flexShrink: 1,
      alignSelf: expanded ? "center" : undefined,
      overflow: "hidden",
    },
    checkHolder: {
      backgroundColor: complete
        ? colors.Backgrounds.success
        : AppColor.TRANSPARENT,
      borderColor: colors.Borders.dramatic,
      width: Sizes.Fonts.ICONS,
      height: Sizes.Fonts.ICONS,
      borderWidth: 1,
      borderRadius: Sizes.Fonts.ICONS,
      borderStyle: "dashed",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    expanderColumn: {},
    expandedContent: {
      paddingTop: Sizes.Spacings.STANDARD,
      borderTopWidth: 1,
      borderTopColor: colors.Borders.default,
      marginTop: Sizes.Spacings.STANDARD,
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
    buttonHolder: {
      paddingVertical: Sizes.Spacings.STANDARD,
      display: "flex",
      flexDirection: "row",
    },
    textHolder: {
      paddingVertical: Sizes.Spacings.STANDARD,
    },
    smallText: {
      flexWrap: "wrap",
      color: colors.Text.subtle,
      fontWeight: "300",
    },
  });
};
