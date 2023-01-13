import { FontAwesome } from "@expo/vector-icons";
import { observer } from "mobx-react";
import React from "react";
import { GestureResponderEvent, Modal, Pressable } from "react-native";
import { View } from "../components/Themed";
import { useColors } from "../hooks/useColorScheme";
import { useModal } from "../contexts/ModalContext";
import { modalStyles } from "../styles/modals";
import PickyLogin from "./modals/Login";

const AppModal = observer(() => {
  const colors = useColors();
  const modalStore = useModal();
  const clearModal = () => {
    modalStore.setModal();
  };
  const eatClick = (event: GestureResponderEvent) => {};

  const { background, modal, header, body } = modalStyles(colors);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!modalStore.modal}
      onRequestClose={clearModal}
    >
      <Pressable style={background} onPress={clearModal}>
        <Pressable style={modal} onPress={eatClick}>
          <View style={header}>
            <View style={{ flexGrow: 1 }} />
            <Pressable onPress={clearModal}>
              <FontAwesome name="close" size={25} color={colors.Text.default} />
            </Pressable>
          </View>
          <View style={body}>
            <PickyLogin />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
});
export default AppModal;
