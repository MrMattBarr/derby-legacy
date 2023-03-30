import { StyleSheet } from "react-native";
import { Sizes } from "styles/sizes";
import { Theme } from "../../constants/Colors";

interface IProps {
  hasTextBar: boolean;
  isCurrentPage?: boolean;
}

export const generateStyles = (
  colors: Theme,
  { hasTextBar, isCurrentPage }: IProps
) => {
  return StyleSheet.create({
    clear: {
      backgroundColor: "transparent",
      display: "flex",
      flexGrow: 1,
      flexDirection: "row",
    },
    spacer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
      borderColor: colors.Borders.default,
      borderTopWidth: hasTextBar ? 0 : 1,
      zIndex: 3,
      height: Sizes.PHONE_BOTTOM_NAV,
      backgroundColor: colors.Backgrounds.secondary,
      width: "100%",
    },
    iconHolder: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
    },
    alert: {
      backgroundColor: colors.Backgrounds.success,
      position: "absolute",
      top: -5,
      right: -5,
      zIndex: 2,
      width: 25,
      height: 25,
      borderRadius: 25,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.Text.default,
    },
    alertText: {
      fontWeight: "bold",
      color: colors.Text.default,
    },
    text: {
      color: isCurrentPage ? colors.Player.progress : colors.Text.default,
    },
  });
};
