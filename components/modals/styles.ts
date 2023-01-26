import { StyleSheet } from "react-native";
import { AppColor, Theme } from "../../constants/Colors";
import { Sizes } from "../../styles/sizes";

interface IModalStyle {
  padded?: boolean;
  unpadded?: boolean;
  opaque?: boolean;
  isMobile?: boolean;
}
export const modalStyles = (colors: Theme, props?: IModalStyle) => {
  const { padded, unpadded, opaque, isMobile } = props ?? {};
  const mobileStyles = {
    flexGrow: 1,
    marginTop: 100,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  };
  const baseStyles = {
    borderColor: colors.Borders.default,
    borderRadius: Sizes.VERY_CURVED_BORDER,
    backgroundColor: colors.Backgrounds.primary,
    borderWidth: 1,
  };

  const bigScreenStyles = {
    borderRadius: Sizes.CURVED_BORDER,
    borderColor: colors.Borders.dramatic,
    minHeight: Sizes.ContentHeights.SMALL_MODAL,
    maxHeight: Sizes.ContentHeights.BIG_MODAL,
    minWidth: Sizes.ContentWidths.CENTER,
    maxWidth: Sizes.Pages.WEB,
    marginTop: "-45vh",
  };
  console.log({ isMobile });

  let modalStyles = isMobile
    ? { ...baseStyles, ...mobileStyles }
    : { ...baseStyles, ...bigScreenStyles };

  return StyleSheet.create({
    modal: modalStyles,
    background: {
      backgroundColor: AppColor.TRANSPARENT_BLACK,
      display: "flex",
      justifyContent: isMobile ? undefined : "center",
      alignItems: isMobile ? undefined : "center",
      flexGrow: 1,
    },
    header: {},
    body: {
      padding: Sizes.Spacings.STANDARD,
      flexGrow: 1,
    },
  });
};
