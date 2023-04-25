import { AppColor, Theme } from "constants/Colors";
import { StyleSheet } from "react-native";
import { Sizes } from "styles/sizes";

interface IModalStyle {
  padded?: boolean;
  unpadded?: boolean;
  opaque?: boolean;
  isMobile?: boolean;
}
export const modalStyles = (colors: Theme, props?: IModalStyle) => {
  const { isMobile } = props ?? {};
  const mobileStyles = {
    flexGrow: 1,
    marginTop: 100,
    borderBottomLeftRadius: 0,
    borderTopWidth: 1,
    borderColor: colors.Borders.subtle,
    borderBottomRightRadius: 0,
    marginHorizontal: -1,
    borderWidth: 1,
  };
  const baseStyles = {
    borderColor: colors.Borders.default,
    borderRadius: Sizes.VERY_CURVED_BORDER,
    overflow: "hidden" as any,
    backgroundColor: colors.Backgrounds.primary,
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
      overflow: "hidden",
      flexGrow: 1,
    },
  });
};
