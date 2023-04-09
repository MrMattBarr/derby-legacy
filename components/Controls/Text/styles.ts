import { StyleSheet } from "react-native";
import { Theme } from "../../../constants/Colors";
import { Sizes } from "../../../styles/sizes";

interface options {
  isHeader: boolean;
}
export const generateStyles = (colors: Theme, { isHeader }: options) => {
  return StyleSheet.create({
    text: {
      color: colors.Text.default,
      fontWeight: isHeader ? "bold" : "normal",
      fontSize: isHeader ? Sizes.Fonts.HEADER : Sizes.Fonts.DFEAULT,
    },
  });
};
