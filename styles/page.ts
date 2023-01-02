import { Platform, StyleSheet } from "react-native";
import { Theme } from "../constants/Colors";

export const generatePageStyles = (colors: Theme) => {
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
      }),
    },
  });
};
