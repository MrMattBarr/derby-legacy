import { JSXElement } from "@babel/types";
import { action, makeObservable, observable, runInAction } from "mobx";

import { useLocalObservable } from "mobx-react";
import React, { useContext, useState } from "react";
import { Modal, Pressable, View } from "react-native";
import RecordingModal from "../components/modals/Recording";
import { modalStyles } from "../components/modals/styles";
import { useColors } from "../hooks/useColorScheme";

export enum ModalKey {
  RECORDING = "RECORDING",
  NONE = "NONE",
}

const ModalByKey: Record<ModalKey, () => JSX.Element> = {
  [ModalKey.RECORDING]: RecordingModal,
  [ModalKey.NONE]: RecordingModal,
};

type ModalContract = {
  setModal: React.Dispatch<React.SetStateAction<ModalKey>>;
};

export const ModalContext = React.createContext<ModalContract | undefined>(
  undefined
);

export const ModalProvider = ({ children }: any) => {
  const colors = useColors();
  const styles = modalStyles(colors);
  const [modal, setModal] = useState(ModalKey.RECORDING);
  const Component = ModalByKey[modal];
  const unsetModal = () => {
    setModal(ModalKey.NONE);
  };
  return (
    <ModalContext.Provider value={{ setModal }}>
      <Modal
        visible={modal !== ModalKey.NONE}
        animationType="slide"
        transparent
      >
        <Pressable style={styles.background} onPress={unsetModal}>
          <View style={styles.modal}>
            <View style={styles.header}></View>
            <View style={styles.body}>
              <Component />
            </View>
          </View>
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
