import { Platform, StyleSheet } from "react-native";

export const mainStyles = (colors: any) => {
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
      borderColor: colors.hardBorder,
      borderWidth: 1,
    },
    button: {
      padding: 20,
      backgroundColor: colors.action,
      borderColor: colors.hardBorder,
      borderWidth: 2,
    },
    page: {
      backgroundColor: colors.brandBackground,
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
    title: {
      color: colors.text,
      fontWeight: "bold",
      fontSize: 20,
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
    spacer: {
      flexGrow: 1,
      backgroundColor: "transparent",
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
  });
