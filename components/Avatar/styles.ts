import { StyleSheet } from "react-native";
import { AppColor, Theme } from "../../constants/Colors";
import { Sizes } from "../../styles/sizes";

interface IAvatarStyles {
  size?: number;
  framed?: boolean;
  isMobile?: boolean;
}

export const generateStyles = (
  colors: Theme,
  { size, framed, isMobile }: IAvatarStyles
) => {
  const avatarSize = size ?? 50;
  return StyleSheet.create({
    holder: {
      backgroundColor: framed ? colors.Backgrounds.empty : AppColor.TRANSPARENT,
      borderWidth: framed ? 2 : 0,
      borderColor: colors.Borders.default,
      borderRadius: isMobile ? size : Sizes.CURVED_BORDER,
      flexGrow: 0,
      alignSelf: "flex-start",
      display: "flex",
    },
    avatar: {
      width: avatarSize,
      height: avatarSize,
      margin: Sizes.Spacings.STANDARD,
    },
    avatarPlaceHolder: {
      width: avatarSize,
      height: avatarSize,
      borderRadius: avatarSize,
      backgroundColor: "#333",
      marginRight: 10,
    },
  });
};
