import React, { useContext, useState } from "react";
import { Modal, Pressable, View } from "react-native";
import ClickEater from "../components/controls/ClickEater";
import AvatarUpload from "../components/modals/AvatarUpload";
import RecordingModal from "../components/modals/Recording";
import SpotEditorModal from "../components/modals/SpotEditor";
import { modalStyles } from "../components/modals/styles";
import Nothing from "../components/Nothing";
import { useColors } from "../hooks/useColorScheme";
import useClient from "./ClientContext";

export enum ModalKey {
  RECORDING = "recording",
  SPOT_EDITOR = "spotEditor",
  AVATAR_UPLOAD = "avatarUpload",
  NONE = "none",
}

const ModalByKey: Record<ModalKey, () => JSX.Element> = {
  [ModalKey.RECORDING]: RecordingModal,
  [ModalKey.SPOT_EDITOR]: SpotEditorModal,
  [ModalKey.AVATAR_UPLOAD]: AvatarUpload,
  [ModalKey.NONE]: Nothing,
};

interface ModalArgs {
  spotId: string;
}

type ModalContract = {
  setModal: (key: ModalKey, args?: Partial<ModalArgs>) => void;
  modalArgs: Partial<ModalArgs>;
};

export const ModalContext = React.createContext<ModalContract | undefined>(
  undefined
);

export const ModalProvider = ({ children }: any) => {
  const colors = useColors();
  const { isMobile } = useClient();
  const styles = modalStyles(colors, { isMobile });
  const [modal, setModalKey] = useState(ModalKey.NONE);
  const [modalArgs, setModalArgs] = useState<Partial<ModalArgs>>({});
  const Component = ModalByKey[modal];

  const setModal = (key: ModalKey, args?: Partial<ModalArgs>) => {
    setModalKey(key);
    setModalArgs(args ?? {});
  };
  const unsetModal = () => {
    setModal(ModalKey.NONE);
  };
  const animationType = isMobile ? "slide" : "fade";

  return (
    <ModalContext.Provider value={{ setModal, modalArgs }}>
      <Modal
        visible={modal !== ModalKey.NONE}
        animationType={animationType}
        transparent
      >
        <Pressable style={styles.background} onPress={unsetModal}>
          <ClickEater style={styles.modal}>
            <View style={styles.header}></View>
            <View style={styles.body}>
              <Component />
            </View>
          </ClickEater>
        </Pressable>
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
};
