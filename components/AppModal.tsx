import { FontAwesome } from "@expo/vector-icons";
import { observer } from "mobx-react";
import React from "react";
import { GestureResponderEvent, Modal, Pressable } from "react-native";
import { View } from "../components/Themed";
import { useColors } from "../hooks/useColorScheme";
import { useModal } from "../stores/ModalStore";
import mainStyles from "../styles/main";
import PickyLogin from "./Login";

const AppModal = observer(() => {
  const colors = useColors();
  const modalStore = useModal();
  const clearModal = () => {
    modalStore.setModal();
  };
  const eatClick = (event: GestureResponderEvent) => {};

  const styles = mainStyles(colors);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!modalStore.modal}
      onRequestClose={clearModal}
    >
      <Pressable style={styles.modalBG} onPress={clearModal}>
        <Pressable style={styles.modalBox} onPress={eatClick}>
          <View style={styles.modalHeader}>
            <View style={{ flexGrow: 1 }} />
            <Pressable onPress={clearModal}>
              <FontAwesome name="close" size={25} color={colors.Text.default} />
            </Pressable>
          </View>
          <View style={styles.modalBody}>
            <PickyLogin />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
});
export default AppModal;
