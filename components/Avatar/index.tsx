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
  editable?: boolean;
  borderWidth?: number;
  style?: any;
}

const Avatar = observer(({ size, editable, borderWidth, style }: IAvatar) => {
  const { user, isSelf } = useUser();
  const { isMobile } = useClient();
  const { setModal } = useModal();
  const src = { uri: user?.profile?.avatar };
  const colors = useColors();
  const s = generateStyles(colors, { size, isMobile, borderWidth });
  const canEdit = isSelf && editable;
  const editPhoto = () => {
    if (canEdit) {
      setModal(ModalKey.AVATAR_UPLOAD);
    }
  };

  return (
    <Pressable onPress={editPhoto} style={{ ...(style ?? {}) }}>
      <View style={s.holder}>
        {src && <Image source={src} style={s.avatar} />}
        {!src && <View style={s.avatarPlaceHolder} />}
      </View>
      {canEdit && (
        <View style={s.editView}>
          <Entypo
            name="camera"
            style={{ marginRight: Sizes.Spacings.SMALL }}
            color={colors.Text.default}
          />
          <Text style={s.editText}>Edit</Text>
        </View>
      )}
    </Pressable>
  );
});

export default Avatar;
