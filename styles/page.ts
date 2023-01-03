import { Platform, StyleSheet } from "react-native";
import { Theme } from "../constants/Colors";
import { Sizes } from "./sizes";

interface IPageStyle {
  padded?: boolean;
}
export const generatePageStyles = (colors: Theme, props?: IPageStyle) => {
  const padded = props?.padded;
  return StyleSheet.create({
    page: {
      backgroundColor: colors.Backgrounds.primary,
      flexGrow: 1,
    },
    pageContent: {
      ...Platform.select({
        web: {
          padding: 20,
        },
        native: {
          padding: padded ? Sizes.Spacings.STANDARD : 0,
        },
      }),
    },
  });
};
