import { Platform, StyleSheet } from "react-native";

const mainStyles = (colors: any) => {
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
    page: {
      backgroundColor: colors.brandBackground,
      flexGrow: 1,
    },
    pageContent: {
      ...Platform.select({
        web: {
          padding: 20,
        },
      }),
    },
    container: {
      backgroundColor: "transparent",
    },
    webHeader: {
      borderBottomWidth: 1,
      backgroundColor: colors.tintedBrandBackground,
      userSelect: "none",
      color: colors.text,
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
    modalBody: {
      flexGrow: 1,
      padding: 20,
      alignItems: "stretch",
      backgroundColor: "transparent",
    },
    modalBG: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingVertical: 30,
      cursor: "default",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#3339",
      display: "flex",
    },
    modalHeader: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.brandBackground,
    },
    modalBox: {
      backgroundColor: colors.contrastBG,
      display: "flex",
      overflow: "hidden",
      cursor: "default",
      ...Platform.select({
        web: {
          borderRadius: 5,
          borderWidth: 1,
          borderColor: colors.text,
        },
        native: {
          borderRadius: 20,
        },
      }),
    },
    flexView: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });
};

export default mainStyles;
