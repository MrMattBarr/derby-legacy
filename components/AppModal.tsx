import { FontAwesome } from "@expo/vector-icons";
import { observer } from "mobx-react";
import React from "react";
import { Alert, Modal, Pressable, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import useColorScheme, { useColors } from "../hooks/useColorScheme";
import { useModal } from "../stores/ModalStore";
import mainStyles from "../styles/main";
import PickyLogin from "./Login";

const AppModal = observer(() => {
  const colors = useColors();
  const modalStore = useModal();
  const clearModal = () => {
    modalStore.setModal();
  };

  const styles = mainStyles(colors);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!modalStore.modal}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.modalBG}>
        <View style={styles.modalBox}>
          <View style={styles.modalHeader}>
            <View style={{ flexGrow: 1 }} />
            <Pressable onPress={clearModal}>
              <FontAwesome name="close" size={25} color={colors.text} />
            </Pressable>
          </View>
          <View style={styles.modalBody}>
            <PickyLogin />
          </View>
        </View>
      </View>
    </Modal>
  );
});
export default AppModal;
