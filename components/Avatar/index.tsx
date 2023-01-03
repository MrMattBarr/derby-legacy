import { observer } from "mobx-react-lite";
import React from "react";
import { Image } from "react-native";
import useUser from "../../contexts/UserContext";
import { useColors } from "../../hooks/useColorScheme";
import { View } from "../Themed";
import { generateStyles } from "./styles";

interface IAvatar {
  size?: number;
}

const Avatar = observer(({ size }: IAvatar) => {
  const { user } = useUser();
  const src = { uri: user?.profile?.avatar };
  const colors = useColors();
  const styles = generateStyles(colors, { size });
  return (
    <>
      {src && <Image source={src} style={styles.avatar} />}
      {!src && <View style={styles.avatarPlaceHolder} />}
    </>
  );
});

export default Avatar;
