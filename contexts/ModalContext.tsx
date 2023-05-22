import { modalStyles } from "components/modals/styles";
import { ModalByKey, ModalKey } from "config/ModalKeys";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import { Modal, Pressable, View } from "react-native";
import useClient from "./ClientContext";

interface ModalArgs {
  spotId: string;
  offerId: string;
  scriptParserArgs: {
    lines: string[];
    title: string;
  };
}

type ModalContract = {
  setModal: (key: ModalKey, args?: Partial<ModalArgs>) => void;
  modalArgs: Partial<ModalArgs>;
};

export const ModalContext = React.createContext<ModalContract | undefined>(
  undefined
);

export const ModalProvider = observer(({ children }: any) => {
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
      {children}
    </ModalContext.Provider>
  );
});

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
};
