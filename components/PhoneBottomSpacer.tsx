import React from "react";
import { Platform, StyleSheet, useColorScheme } from "react-native";
import Colors from "../constants/Colors";
import { useModal } from "../stores/ModalStore";
import IconButton from "./IconButton";
import Nothing from "./Nothing";
import { Text, View } from "./Themed";

const PhoneBottomSpacer = () => {
  const colorScheme = useColorScheme() || "dark";
  const modalStore = useModal();

  const styles = StyleSheet.create({
    clear: {
      backgroundColor: "transparent",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    spacer: {
      ...Platform.select({
        native: {
          padding: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          borderColor: "#bcac8b",
          borderTopWidth: 1,
          backgroundColor: Colors[colorScheme].accentBG,
          width: "100%",
        },
      }),
    },
  });

  const openLogin = () => {
    modalStore.setModal("LOGIN");
  };
  return (
    <View style={styles.spacer}>
      <View style={styles.clear}>
        <IconButton icon="user" onPress={openLogin} />
      </View>
    </View>
  );
};

const PickyPhoneBottomSpacer = Platform.select({
  native: () => PhoneBottomSpacer,
  default: () => Nothing,
})();

export default PickyPhoneBottomSpacer;
