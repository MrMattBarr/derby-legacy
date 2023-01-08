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
      borderWidth: 2,
      borderColor: focused ? colors.Borders.dramatic : AppColor.TRANSPARENT,
      marginBottom: Sizes.Spacings.SMALL,
      padding: Sizes.Spacings.STANDARD,
      borderRadius: Sizes.CURVED_BORDER,
    },
  });
};
