import App from "App";
import { AppColor, Theme } from "constants/Colors";
import { StyleSheet } from "react-native";
import { Sizes } from "styles/sizes";
import { ApprovalStatus } from "types/Take";

interface IStyles {
  expanded?: boolean;
  status?: ApprovalStatus;
}

export const statusColor = (
  status: ApprovalStatus | undefined,
  colors: Theme
) => {
  const map = {
    [ApprovalStatus.APPROVED]: colors.Text.success,
    [ApprovalStatus.REJECTED]: colors.Text.default,
    [ApprovalStatus.UNHEARD]: colors.Text.default,
  };
  return map[status ?? ApprovalStatus.UNHEARD];
};

export const generateStyles = (colors: Theme, props?: IStyles) => {
  const { expanded, status } = props ?? {};

  const complete = status === ApprovalStatus.APPROVED;
  const unheard = status === ApprovalStatus.UNHEARD || !status;

  return StyleSheet.create({
    listItem: {
      backgroundColor: complete
        ? colors.Backgrounds.contrast
        : colors.Backgrounds.primary,
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
      color: statusColor(status, colors),
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
      marginRight: Sizes.Spacings.STANDARD,
    },
    checkHolder: {
      backgroundColor: complete
        ? colors.Backgrounds.empty
        : AppColor.TRANSPARENT,
      borderColor: statusColor(status, colors),
      width: Sizes.Fonts.ICONS,
      height: Sizes.Fonts.ICONS,
      borderWidth: 2,
      borderRadius: Sizes.Fonts.ICONS,
      borderStyle: unheard ? "dashed" : "solid",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    expanderColumn: {},
    expandedContent: {
      paddingTop: Sizes.Spacings.STANDARD,
      borderTopWidth: 1,
      borderColor: complete ? colors.Borders.default : colors.Borders.subtle,
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
      paddingTop: Sizes.Spacings.STANDARD,
      borderTopWidth: 1,
      borderTopColor: colors.Borders.subtle,
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
