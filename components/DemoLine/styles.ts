import { StyleSheet } from "react-native";
import { AppColor, Theme } from "../../constants/Colors";
import { Sizes } from "../../styles/sizes";

interface ITapeStyle {
  background?: AppColor;
  focused?: boolean;
}
export const generateStyles = (colors: Theme, props?: ITapeStyle) => {
  const { background, focused } = props ?? {};
  return StyleSheet.create({
    listItem: {
      color: colors.Text.default,
      backgroundColor: background ?? colors.Backgrounds.default,
      borderBottomWidth: 1,
      borderColor: colors.Borders.default,
      padding: Sizes.Spacings.STANDARD,
    },
  });
};
