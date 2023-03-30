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
      borderColor: colors.Borders.default,
      padding: Sizes.Spacings.STANDARD,
      paddingLeft: 0,
      paddingBottom: Sizes.Spacings.STANDARD,
    },
    titleText: {
      color: colors.Text.default,
      fontWeight: "bold",
      fontSize: Sizes.Fonts.HEADER,
    },
    content: {
      display: "flex",
      flexDirection: "row",
    },
    header: {
      display: "flex",
      flexDirection: "row",
    },
    spacer: {
      flexGrow: 1,
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
    smallText: {
      color: colors.Text.subtle,
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
    },
  });
};
