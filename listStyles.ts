import { Platform, StyleSheet } from "react-native";
import { Theme } from "./constants/Colors";

export const mainStyles = (colors: Theme) => {
  return StyleSheet.create({
    header: {
      display: "flex",
      backgroundColor: "transparent",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 30,
    },
    input: {
      ...Platform.select({
        web: {
          outlineStyle: "none",
        },
      }),
      flexGrow: 1,
      backgroundColor: colors.inputBG,
      paddingHorizontal: 10,
      fontSize: 22,
      color: colors.text,
      marginBottom: 20,
      borderColor: colors.hardBorder,
      borderWidth: 1,
    },
    button: {
      padding: 20,
      backgroundColor: colors.action,
      borderColor: colors.hardBorder,
      borderWidth: 2,
    },
    webHeader: {
      borderBottomWidth: 1,
      backgroundColor: colors.tintedBrandBackground,
      userSelect: "none",
      color: colors.Text.default,
      fontFamily: "Arial",
      fontSize: "1.4rem",
      flexDirection: "row",
      display: "flex",
      padding: 5,
      alignItems: "center",
      borderColor: colors.hardBorder,
    },
    headerHomeLink: {
      backgroundColor: "transparent",
      paddingRight: 20,
      borderRightWidth: 1,
      borderRightColor: colors.text,
      color: colors.text,
      fontSize: 20,
    },
    headerLink: {
      color: colors.hardBorder,
      paddingHorizontal: 20,
    },
    spacer: {
      flexGrow: 1,
    },
    headerText: {
      color: colors.text,
      fontSize: 20,
      fontWeight: "bold",
    },
    deleteText: {
      color: colors.deleteText,
      padding: 20,
    },
    flexView: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });
};

export const listStyle = (colors: any) =>
  StyleSheet.create({
    listItem: {
      color: colors.text,
      backgroundColor: colors.listItemBackground,
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
    project: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 5,
      backgroundColor: "#fffb",
    },
    spacer: {
      flexGrow: 1,
      backgroundColor: "transparent",
    },
    textHolder: {
      opacity: 0.8,
      color: "#EEEEEE",
      marginVertical: 5,
      backgroundColor: colors.listItemBackground,
      borderRadius: 2,
      paddingHorizontal: 5,
      display: "flex",
      overflow: "hidden",
      flexShrink: 1,
      flexWrap: "wrap",
    },
    text: {
      flexShrink: 1,
      marginBottom: 5,
      flexWrap: "wrap",
    },
    buttonText: {
      flexShrink: 1,
      marginBottom: 5,
      color: colors.buttonFG,
      flexWrap: "wrap",
    },
  });
