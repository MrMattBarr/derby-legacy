import { StyleSheet } from "react-native";
import { AppColor, Theme } from "../../constants/Colors";
import { Sizes } from "../../styles/sizes";

interface IModalStyle {
  padded?: boolean;
  unpadded?: boolean;
  opaque?: boolean;
}
export const modalStyles = (colors: Theme, props?: IModalStyle) => {
  const { padded, unpadded, opaque } = props ?? {};
  return StyleSheet.create({
    modal: {
      borderColor: colors.Borders.default,
      borderRadius: Sizes.CURVED_BORDER,
      backgroundColor: colors.Backgrounds.primary,
      flexGrow: 1,
      marginTop: 100,
      borderTopLeftRadius: Sizes.VERY_CURVED_BORDER,
      borderTopRightRadius: Sizes.VERY_CURVED_BORDER,
    },
    background: {
      backgroundColor: AppColor.TRANSPARENT_BLACK,
      flexGrow: 1,
    },
    header: {
      height: 50,
    },
    body: {
      padding: Sizes.Spacings.STANDARD,
      flexGrow: 1,
    },
  });
};
