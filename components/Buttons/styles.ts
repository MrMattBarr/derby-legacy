import { StyleSheet } from "react-native";
import { DefaultColors, Theme } from "../../constants/Colors";

interface StyleParams {
  fontSize?: number;
}
export const generateStyles = (colors: Theme, { fontSize }: StyleParams) => {
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
      fontSize: fontSize ?? 12,
      color: colors.Text.default,
    },
    disabledBigButton: {
      opacity: 0.6,
      padding: 10,
      borderWidth: 3,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
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
      justifyContent: "space-between",
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
      color: colors.Text.default,
    },
  });
};
