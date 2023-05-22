import Nothing from "components/Nothing";
import AvatarUpload from "components/modals/AvatarUpload";
import OfferModal from "components/modals/Offer";
import RecordingModal from "components/modals/Recording";
import ScriptParser from "components/modals/ScriptParser";
import SpotEditorModal from "components/modals/SpotEditor";
import { modalStyles } from "components/modals/styles";
import useClient from "contexts/ClientContext";
import { ModalKey, useModal } from "contexts/ModalContext";
import { useColors } from "hooks/useColorScheme";
import React from "react";
import { Modal, Pressable, View } from "react-native";

export const ModalByKey: Record<ModalKey, () => JSX.Element> = {
  [ModalKey.RECORDING]: RecordingModal,
  [ModalKey.SPOT_EDITOR]: SpotEditorModal,
  [ModalKey.AVATAR_UPLOAD]: AvatarUpload,
  [ModalKey.OFFER]: OfferModal,
  [ModalKey.SCRIPT_PARSER]: ScriptParser,
  [ModalKey.NONE]: Nothing,
};

const ActiveModal = () => {
  const { modal, setModal } = useModal();
  const Component = ModalByKey[modal];
  const { isMobile } = useClient();
  const colors = useColors();
  const styles = modalStyles(colors, { isMobile });
  const animationType = isMobile ? "slide" : "fade";

  const unsetModal = () => {
    setModal(ModalKey.NONE);
  };

  return (
    <Modal
      visible={modal !== ModalKey.NONE}
      animationType={animationType}
      transparent
    >
      <View style={styles.background}>
        <Pressable style={styles.dismissBar} onPress={unsetModal} />
        <View style={styles.modal}>
          <View style={styles.header}></View>
          <View style={styles.body}>
            <Component />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ActiveModal;
