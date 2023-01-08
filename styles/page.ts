import { Platform, StyleSheet } from "react-native";
import { AppColor, Theme } from "../constants/Colors";
import { Sizes } from "./sizes";

interface IPageStyle {
  padded?: boolean;
  unpadded?: boolean;
  opaque?: boolean;
  isMobile?: boolean;
}
export const generatePageStyles = (colors: Theme, props?: IPageStyle) => {
  const { padded, unpadded, opaque, isMobile } = props ?? {};

  const webContent = {
    backgroundColor: colors.Backgrounds.primary,
    width: Sizes.Pages.WEB,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    alignSelf: "center",
    overflow: "hidden",
    borderColor: colors.Borders.default,
  };

  const section = Platform.select({
    web: {
      padding: unpadded ? 0 : Sizes.Spacings.STANDARD,
    },
    native: {
      padding: padded ? Sizes.Spacings.STANDARD : 0,
    },
  });
  return StyleSheet.create({
    page: {
      flexGrow: 1,
      backgroundColor: opaque
        ? colors.Backgrounds.primary
        : AppColor.TRANSPARENT,
    },
    pageContent: {
      ...section,
      flexGrow: 1,
      ...Platform.select({
        web: isMobile ? {} : webContent,
      }),
    },
    section: { ...section },
  });
};
