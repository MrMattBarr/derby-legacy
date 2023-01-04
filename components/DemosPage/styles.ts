import { Platform, StyleSheet } from "react-native";
import { Theme } from "../../constants/Colors";

export const generateStyles = (colors: Theme) => {
  return StyleSheet.create({
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 2,
      padding: 10,

      ...Platform.select({
        native: {
          backgroundColor: colors.Backgrounds.secondary,
        },
        web: {
          backgroundColor: colors.Backgrounds.primary,
        },
      }),
    },
    list: { flex: 1 },
    pageNameAndIcon: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    pageName: {
      marginRight: 30,
    },
  });
};
