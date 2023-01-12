import { Platform, StyleSheet } from "react-native";
import { Theme } from "../../constants/Colors";

interface IStyles {
  isMobile?: boolean;
}
export const generateStyles = (colors: Theme, props?: IStyles) => {
  const { isMobile } = props ?? {};
  return StyleSheet.create({
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 2,
      padding: 10,
      backgroundColor: isMobile
        ? colors.Backgrounds.secondary
        : colors.Backgrounds.primary,
    },
    list: { flex: 1 },
    pageNameAndIcon: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    section: {
      backgroundColor: "green",
    },
    pageName: {
      marginRight: 30,
    },
  });
};
