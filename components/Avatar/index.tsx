import { observer } from "mobx-react-lite";
import React from "react";
import { Image } from "react-native";
import useClient from "../../contexts/ClientContext";
import useUser from "../../contexts/UserContext";
import { useColors } from "../../hooks/useColorScheme";
import { View } from "../Themed";
import { generateStyles } from "./styles";

interface IAvatar {
  size?: number;
  framed?: boolean;
}

const Avatar = observer(({ size, framed }: IAvatar) => {
  const { user } = useUser();
  const { isMobile } = useClient();
  const src = { uri: user?.profile?.avatar };
  const colors = useColors();
  const styles = generateStyles(colors, { size, framed, isMobile });
  return (
    <View style={styles.holder}>
      {src && <Image source={src} style={styles.avatar} />}
      {!src && <View style={styles.avatarPlaceHolder} />}
    </View>
  );
});

export default Avatar;
