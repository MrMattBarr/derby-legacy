import { StyleSheet } from "react-native";
import { Theme } from "../../constants/Colors";

export const generateStyles = (colors: Theme) => {
  return StyleSheet.create({
    webHeader: {
      borderBottomWidth: 1,
      backgroundColor: colors.Backgrounds.secondary,
      userSelect: "none",
      color: colors.Text.default,
      fontFamily: "Arial",
      fontSize: "1.4rem",
      flexDirection: "row",
      display: "flex",
      padding: 5,
      zIndex: 3,
      alignItems: "center",
      borderColor: colors.Borders.default,
    },
    headerHomeLink: {
      backgroundColor: "transparent",
      paddingRight: 20,
      borderRightWidth: 1,
      borderRightColor: colors.Borders.dramatic,
      color: colors.Text.default,
      fontSize: 20,
    },
    headerLink: {
      color: colors.Text.default,
      paddingHorizontal: 20,
    },
    spacer: {
      flexGrow: 1,
    },
    headerText: {
      color: colors.Text.default,
      fontSize: 20,
      fontWeight: "bold",
    },
  });
};
