import { StyleSheet } from "react-native";
import { Theme } from "../../constants/Colors";
import { Sizes } from "../../styles/sizes";

export const generateStyles = (colors: Theme) => {
  return StyleSheet.create({
    input: {
      backgroundColor: colors.Backgrounds.inputs,
      borderColor: colors.Borders.dramatic,
      borderWidth: 1,
      color: colors.Text.default,
      borderRadius: 5,
      flexGrow: 1,
      padding: 10,
    },
    bar: {
      backgroundColor: colors.Backgrounds.secondary,
      padding: 10,
      display: "flex",
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.Borders.dramatic,
      flexDirection: "row",
    },
    sendButton: {
      backgroundColor: colors.Backgrounds.submit,
      borderColor: colors.Borders.dramatic,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: 38,
      marginLeft: Sizes.Spacings.STANDARD,
      width: 38,
      height: 38,
    },
  });
};
