import { StyleSheet } from "react-native";
import { Theme } from "../../constants/Colors";

interface IAvatarStyles {
  size?: number;
}

export const generateStyles = (colors: Theme, { size }: IAvatarStyles) => {
  const avatarSize = size ?? 50;
  return StyleSheet.create({
    avatar: {
      width: avatarSize,
      height: avatarSize,
      marginRight: 10,
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
