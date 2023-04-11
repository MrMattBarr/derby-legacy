import { Platform, StyleSheet } from "react-native";
import { Theme } from "../../constants/Colors";
import { Sizes } from "../../styles/sizes";

interface IStyles {}

export const generateStyles = (colors: Theme, props?: IStyles) => {
  return StyleSheet.create({
    progressBar: {
      width: "100%",
      height: Sizes.Spacings.STANDARD,
      borderRadius: Sizes.CURVED_BORDER,
      borderWidth: 1,
      borderColor: colors.Borders.default,
      backgroundColor: colors.Backgrounds.empty,
    },
  });
};
