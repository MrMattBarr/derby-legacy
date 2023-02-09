import { Entypo } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import React from "react";
import { Image, Pressable } from "react-native";
import useClient from "../../contexts/ClientContext";
import { ModalKey, useModal } from "../../contexts/ModalContext";
import useUser from "../../contexts/UserContext";
import { useColors } from "../../hooks/useColorScheme";
import { Sizes } from "../../styles/sizes";
import { Text, View } from "../Themed";
import { generateStyles } from "./styles";

interface IAvatar {
  size?: number;
  framed?: boolean;
  editable?: boolean;
}

const Avatar = observer(({ size, framed, editable }: IAvatar) => {
  const { user, isSelf } = useUser();
  const { isMobile } = useClient();
  const { setModal } = useModal();
  const src = { uri: user?.profile?.avatar };
  const colors = useColors();
  const styles = generateStyles(colors, { size, framed, isMobile });
  const canEdit = isSelf && editable;
  const editPhoto = () => {
    if (canEdit) {
      setModal(ModalKey.AVATAR_UPLOAD);
    }
  };
  console.log({ src });
  return (
    <Pressable onPress={editPhoto}>
      <View style={styles.holder}>
        {src && <Image source={src} style={styles.avatar} />}
        {!src && <View style={styles.avatarPlaceHolder} />}
      </View>
      {canEdit && (
        <View style={styles.editView}>
          <Entypo
            name="camera"
            style={{ marginRight: Sizes.Spacings.SMALL }}
            color={colors.Text.default}
          />
          <Text style={styles.editText}>Edit</Text>
        </View>
      )}
    </Pressable>
  );
});

export default Avatar;
