import { StyleSheet } from "react-native";
import { DefaultColors, Theme } from "../../constants/Colors";
import { Sizes } from "styles/sizes";

interface StyleParams {
  fontSize?: number;
  danger?: boolean;
  compact?: boolean;
  hasIcon?: boolean;
}
export const generateStyles = (
  colors: Theme,
  { fontSize, danger, compact, hasIcon }: StyleParams
) => {
  return StyleSheet.create({
    textButton: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: DefaultColors.TRANSPARENT,
    },
    textButtonText: {
      color: danger ? colors.Text.delete : colors.Text.default,
    },
    disabledBigButton: {
      opacity: 0.6,
      padding: 10,
      borderWidth: 3,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      borderColor: colors.Borders.dramatic,
      backgroundColor: colors.Backgrounds.empty,
    },
    bigButton: {
      paddingVertical: compact ? Sizes.Spacings.SMALL : Sizes.Spacings.STANDARD,
      paddingHorizontal: hasIcon
        ? Sizes.Spacings.STANDARD
        : Sizes.Spacings.LARGE,
      borderWidth: compact ? 1 : 3,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      borderColor: colors.Borders.dramatic,
      backgroundColor: colors.Backgrounds.default,
    },
    bigButtonIcon: {
      alignSelf: "center",
      marginRight: Sizes.Spacings.STANDARD,
    },
    bigButtonText: {
      fontSize: fontSize ?? 18,
      flexGrow: 1,
      textAlign: "center",
      color: danger ? colors.Text.delete : colors.Text.default,
    },
  });
};
