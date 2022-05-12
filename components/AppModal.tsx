import { FontAwesome } from "@expo/vector-icons";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Alert, Modal, Pressable, StyleSheet } from "react-native";
import { updateSpot } from "../api";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import useOverlay from "../contexts/OverlayContext";
import useSpots from "../contexts/SpotsContext";
import useColorScheme from "../hooks/useColorScheme";
import PlaybackModal from "./PlaybackModal";
import RenameControl from "./RenameControl";

const AppModal = observer(() => {
  const { focused, focus } = useOverlay();
  const { spots } = useSpots();
  const spot = focused?.id ? toJS(spots)[focused.id] : undefined;
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    linkText: {
      fontSize: 14,
      color: "#2e78b7",
    },
    centeredView: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingVertical: 30,
      backgroundColor: "#3339",
      display: "flex",
    },
    modalView: {
      margin: 20,
      backgroundColor: colors.contrastBG,
      borderRadius: 20,
      display: "flex",
      flexGrow: 1,
      overflow: "hidden",
    },
    header: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.brandBackground,
    },
    closeButton: {
      fontSize: 25,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonClose: {
      borderRadius: 5,
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    body: {
      flexGrow: 1,
      padding: 20,
      alignItems: "stretch",
      backgroundColor: "transparent",
    },
  });

  const rename = (title: string) => {
    updateSpot({ title, id: spot?.id });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!focused}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <Pressable style={styles.centeredView} onPress={() => focus(undefined)}>
        <Pressable style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.title}>{spot?.title}</Text>

            <Pressable onPress={() => focus(undefined)}>
              <FontAwesome
                name="close"
                size={25}
                color={Colors[colorScheme!].text}
              />
            </Pressable>
          </View>

          <View style={styles.body}>
            <RenameControl onSave={rename} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
});
export default AppModal;
