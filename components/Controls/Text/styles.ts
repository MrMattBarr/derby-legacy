import { StyleSheet } from "react-native";
import { Theme } from "../../../constants/Colors";
import { Sizes } from "../../../styles/sizes";

interface options {
  isHeader: boolean;
  bold: boolean;
  kalam?: boolean;
  wrap?: boolean;
  strikeThrough?: boolean;
}
export const generateStyles = (
  colors: Theme,
  { isHeader, bold, kalam, wrap, strikeThrough }: options
) => {
  return StyleSheet.create({
    text: {
      color: colors.Text.default,
      fontWeight: isHeader || bold ? "bold" : "normal",
      fontFamily: kalam ? "Kalam" : undefined,
      textDecorationLine: strikeThrough ? "line-through" : undefined,
      textDecorationStyle: "solid",
      fontSize: isHeader
        ? kalam
          ? Sizes.Fonts.HEADER * 1.5
          : Sizes.Fonts.HEADER
        : Sizes.Fonts.DFEAULT,
    },
  });
};
