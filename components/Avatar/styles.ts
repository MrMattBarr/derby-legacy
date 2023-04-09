import { StyleSheet } from "react-native";
import { AppColor, Theme } from "../../constants/Colors";
import { Sizes } from "../../styles/sizes";

interface IAvatarStyles {
  size?: number;
  isMobile?: boolean;
  borderWidth?: number;
}

export const generateStyles = (
  colors: Theme,
  { size, isMobile, borderWidth }: IAvatarStyles
) => {
  const avatarSize = size ?? 50;
  return StyleSheet.create({
    holder: {
      backgroundColor: colors.Backgrounds.empty,
      borderWidth: borderWidth ?? 2,
      borderColor: colors.Borders.default,
      borderRadius: isMobile ? avatarSize : Sizes.CURVED_BORDER,
      flexGrow: 0,
      alignSelf: "flex-start",
      overflow: "hidden",
      display: "flex",
    },
    avatar: {
      width: avatarSize,
      height: avatarSize,
      borderRadius: isMobile ? avatarSize : Sizes.CURVED_BORDER,
    },
    avatarPlaceHolder: {
      width: avatarSize,
      height: avatarSize,
      borderRadius: avatarSize,
      overflow: "hidden",
      backgroundColor: "#333",
      marginRight: 10,
    },
    editView: {
      display: "flex",
      flexDirection: "row",
      alignItems: "baseline",
      position: "absolute",
      backgroundColor: colors.Backgrounds.transparentDefault,
      paddingHorizontal: Sizes.Spacings.STANDARD,
      paddingVertical: Sizes.Spacings.SMALL,
      bottom: 0,
      right: 0,
      borderRadius: isMobile ? Sizes.VERY_CURVED_BORDER : 0,
      borderTopLeftRadius: isMobile
        ? Sizes.VERY_CURVED_BORDER
        : Sizes.CURVED_BORDER,
    },
    editText: {
      textDecorationLine: "underline",
      color: colors.Text.default,
    },
  });
};
