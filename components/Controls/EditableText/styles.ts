import { StyleSheet } from "react-native";
import { Theme } from "../../../constants/Colors";
import { Sizes } from "../../../styles/sizes";

interface options {
  canEdit: boolean;
}
export const generateStyles = (colors: Theme, { canEdit }: options) => {
  return StyleSheet.create({
    holder: {
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "row",
      height: 24,
      overflow: "hidden",
      alignItems: "flex-end",
    },
    pressable: {
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "row",
      borderBottomWidth: canEdit ? 1 : 0,
      borderBottomColor: colors.Text.default + "99",
      alignItems: "baseline",
    },
    text: {
      color: colors.Text.default,
      fontSize: Sizes.Fonts.HEADER,
      fontWeight: "bold",
    },
    input: {
      height: "100%",
      overflow: "hidden",
      width: 150,
      backgroundColor: colors.Backgrounds.inputs,
      color: colors.Text.default,
      fontSize: Sizes.Fonts.HEADER,
      borderColor: colors.Borders.dramatic,
      borderWidth: 1,
      paddingHorizontal: Sizes.Spacings.STANDARD,
    },
    icon: {
      marginLeft: Sizes.Spacings.STANDARD,
      fontSize: Sizes.Fonts.HEADER,
    },
    buttonIcon: {
      fontWeight: "bold",
      color: colors.Text.default,
      fontSize: Sizes.Fonts.HEADER,
    },
    saveButton: {
      marginLeft: Sizes.Spacings.STANDARD,
      width: 36,
      height: 24,
      borderWidth: 1,
      borderColor: colors.Borders.default,
      backgroundColor: colors.Backgrounds.success,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    cancelButton: {
      marginLeft: Sizes.Spacings.STANDARD,
      width: 36,
      height: 24,
      borderWidth: 1,
      borderColor: colors.Borders.default,
      backgroundColor: colors.Backgrounds.empty,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });
};
