import { useLinkTo } from "@react-navigation/native";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { useColors } from "../hooks/useColorScheme";
import { useModal } from "../stores/ModalStore";
import TextButton from "./Buttons/TextButton";
import Nothing from "./Nothing";
import { View } from "./Themed";

const PhoneBottomSpacer = () => {
  const linkTo = useLinkTo();
  const colors = useColors();
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
          borderColor: colors.Borders.default,
          borderTopWidth: 1,
          backgroundColor: colors.Backgrounds.secondary,
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
        <TextButton
          onPress={() => {
            linkTo("/demos");
          }}
          label="Demos"
        />
      </View>
    </View>
  );
};

const PickyPhoneBottomSpacer = Platform.select({
  native: () => PhoneBottomSpacer,
  default: () => Nothing,
})();

export default PickyPhoneBottomSpacer;
