import { StyleSheet } from "react-native";
import { Theme } from "../../constants/Colors";

export const generateStyles = (colors: Theme) => {
  return StyleSheet.create({
    listItem: {
      color: colors.Text.default,
      backgroundColor: colors.Backgrounds.empty,
      marginBottom: 2,
    },
    foreground: {
      padding: 10,
      zIndex: 1,
      flex: 1,
      display: "flex",
      backgroundColor: "transparent",
      flexDirection: "row",
    },
    mainContent: {
      backgroundColor: "transparent",
      flexGrow: 1,
    },
    header: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "transparent",
      justifyContent: "space-between",
    },
    title: {
      color: colors.Text.default,
      fontWeight: "bold",
      fontSize: 20,
    },
  });
};
