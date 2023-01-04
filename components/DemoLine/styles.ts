import { StyleSheet } from "react-native";
import { AppColor, Theme } from "../../constants/Colors";
import { Sizes } from "../../styles/sizes";

interface ITapeStyle {
  background?: AppColor;
}
export const generateStyles = (colors: Theme, props?: ITapeStyle) => {
  const background = props?.background;
  return StyleSheet.create({
    listItem: {
      color: colors.Text.default,
      backgroundColor: background ?? colors.Backgrounds.default,
      marginBottom: Sizes.Spacings.SMALL,
      padding: Sizes.Spacings.STANDARD,
    },
  });
};
