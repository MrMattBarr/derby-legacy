import App from "App";
import { AppColor, Theme } from "constants/Colors";
import { StyleSheet } from "react-native";
import { Sizes } from "styles/sizes";
import { ApprovalStatus } from "types/Take";

interface roleModifiers {
  isTalent?: boolean;
  isOwner?: boolean;
}

interface IStyles {
  expanded?: boolean;
  status?: ApprovalStatus;
  modifiers?: roleModifiers;
}
export const statusColor = (
  status: ApprovalStatus | undefined,
  colors: Theme,
  modifiers?: roleModifiers
) => {
  const map = {
    [ApprovalStatus.APPROVED]: colors.Text.complete,
    [ApprovalStatus.REJECTED]: colors.Text.default,
    [ApprovalStatus.UNHEARD]: modifiers?.isTalent
      ? AppColor.ICY_BLUE
      : colors.Text.notice,
    [ApprovalStatus.HEARD]: colors.Text.default,
  };
  if (!status) {
    return colors.Text.default;
  }
  return map[status ?? ApprovalStatus.UNHEARD];
};

export const generateStyles = (colors: Theme, props?: IStyles) => {
  const { expanded, status, modifiers } = props ?? {};

  const complete = status === ApprovalStatus.APPROVED;
  const unheard = status === ApprovalStatus.UNHEARD || !status;

  return StyleSheet.create({
    listItem: {
      backgroundColor: complete
        ? colors.Backgrounds.complete
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
      color: statusColor(status, colors, modifiers),
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
      borderColor: statusColor(status, colors, modifiers),
      width: Sizes.Fonts.ICONS,
      height: Sizes.Fonts.ICONS,
      borderWidth: 2,
      borderRadius: Sizes.Fonts.ICONS,
      borderStyle: unheard ? "dashed" : "solid",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    expanderColumn: {
      width: Sizes.Fonts.ICONS,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    expandedContent: {
      paddingTop: Sizes.Spacings.STANDARD,
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
      display: "flex",
      flexDirection: "row",
    },
    textHolder: {
      paddingVertical: Sizes.Spacings.STANDARD,
      borderTopWidth: 1,
      borderColor: complete ? colors.Borders.default : colors.Borders.subtle,
      marginLeft: Sizes.Fonts.ICONS,
    },
    scriptButton: {
      marginBottom: Sizes.Spacings.STANDARD,
      marginLeft: Sizes.Fonts.ICONS,
    },
    smallText: {
      flexWrap: "wrap",
      color: colors.Text.subtle,
      fontWeight: "300",
    },
    takeLine: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    remainder: {
      flexShrink: 1,
      flexGrow: 1,
    },
  });
};
