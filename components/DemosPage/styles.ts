import { StyleSheet } from "react-native";
import { Theme } from "../../constants/Colors";

export const generateStyles = (colors: Theme) => {
  return StyleSheet.create({
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 2,
      backgroundColor: colors.Backgrounds.secondary,
      padding: 10,
    },
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
