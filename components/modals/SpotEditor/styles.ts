import { StyleSheet } from "react-native";
import { Theme } from "../../../constants/Colors";
import { Sizes } from "../../../styles/sizes";

export const generateStyles = (colors: Theme) => {
  return StyleSheet.create({
    header: {
      color: colors.Text.default,
      fontSize: Sizes.Fonts.HEADER,
    },
  });
};
