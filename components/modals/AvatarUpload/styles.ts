import { StyleSheet } from "react-native";
import { Theme } from "../../../constants/Colors";
import { Sizes } from "../../../styles/sizes";

export const generateStyles = (colors: Theme) => {
  return StyleSheet.create({
    holder: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatarBox: {
      width: 300,
      height: 300,
      marginBottom: Sizes.Spacings.LARGE,
      borderRadius: Sizes.CURVED_BORDER,
      backgroundColor: colors.Backgrounds.empty,
      borderWidth: 2,
      overflow: "hidden",
      borderColor: colors.Borders.default,
    },
    avatar: {
      width: 300,
      height: 300,
    },
    oldAvatar: {
      width: 300,
      height: 300,
      opacity: 0.3,
    },
  });
};
