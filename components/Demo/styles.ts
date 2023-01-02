import { Platform, StyleSheet } from "react-native";
import { DefaultColors, Theme } from "../../constants/Colors";

export const generateStyles = (colors: Theme) => {
  return StyleSheet.create({
    player: {
      ...Platform.select({
        web: {
          padding: 10,
          marginBottom: 20,
        },
        native: {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          width: "100%",
        },
      }),
      borderColor: colors.Borders.default,
      borderWidth: 3,
      flexGrow: 0,
      borderRadius: 10,
      backgroundColor: colors.Backgrounds.default,
      display: "flex",
    },
    holder: {
      display: "flex",
      alignSelf: "center",
      flexDirection: "column",
    },
    tape: {
      borderWidth: 2,
      borderColor: "black",
      position: "relative",
      backgroundColor: "#3f79b3",
      maxWidth: 500,
      aspectRatio: 1.6,
      borderRadius: 10,
      minWidth: 400,
      overflow: "hidden",
      boxShadow: "0px 0px 8px 4px black inset",
      minHeight: 250,
      display: "flex",
      flexDirection: "column",
      padding: 20,
      paddingBottom: 0,
    },
    tapeBgTexture: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      flexGrow: 1,
    },
  });
};
