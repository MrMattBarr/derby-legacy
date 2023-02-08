import { observer } from "mobx-react-lite";
import React from "react";
import { Image } from "react-native";
import useUser from "../../../contexts/UserContext";
import { useColors } from "../../../hooks/useColorScheme";
import { generateStyles } from "./styles";

const Preview = observer(({ src }: { src?: string }) => {
  const user = useUser();
  const finalSrc = { uri: src ?? user.user?.profile?.avatar };

  const colors = useColors();
  const styles = generateStyles(colors);
  const style = src ? styles.avatar : styles.oldAvatar;
  return <Image source={finalSrc} style={style} />;
});

export default Preview;
