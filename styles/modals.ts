import { Platform, StyleSheet } from "react-native";
import { AppColor, Theme } from "../constants/Colors";
import { Sizes } from "./sizes";

interface IPageStyle {
  padded?: boolean;
  unpadded?: boolean;
  opaque?: boolean;
}
export const modalStyles = (colors: Theme, props?: IPageStyle) => {
  const { padded, unpadded, opaque } = props ?? {};

  const section = Platform.select({
    web: {},
  });
  return StyleSheet.create({
    modal: {
      borderColor: colors.Borders.default,
      borderRadius: Sizes.CURVED_BORDER,
      backgroundColor: colors.Backgrounds.secondary,
    },
    background: {},
    header: {},
    body: {},
  });
};
