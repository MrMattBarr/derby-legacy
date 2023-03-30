import { StyleSheet } from "react-native";
import { DefaultColors, Theme } from "../../constants/Colors";

interface StyleParams {
  fontSize?: number;
  danger?: boolean;
}
export const generateStyles = (
  colors: Theme,
  { fontSize, danger }: StyleParams
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
      padding: 10,
      borderWidth: 3,
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
      marginRight: (fontSize ?? 18) * 0.5,
    },
    bigButtonText: {
      fontSize: fontSize ?? 18,
      flexGrow: 1,
      textAlign: "center",
      color: danger ? colors.Text.delete : colors.Text.default,
    },
  });
};
