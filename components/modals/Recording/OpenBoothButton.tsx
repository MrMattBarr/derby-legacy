import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ModalKey, useModal } from "../../../contexts/ModalContext";
import usePlayback from "../../../contexts/PlaybackContext";
import { useColors } from "../../../hooks/useColorScheme";
import { generateStyles } from "./styles";

const OpenBoothButton = () => {
  const playbackStore = usePlayback();
  const { setModal } = useModal();
  const colors = useColors();
  const { openBoothButton, openButtonText } = generateStyles(colors);
  const openModal = () => {
    setModal(ModalKey.RECORDING);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={openBoothButton}
      onPress={openModal}
    >
      <Entypo
        name="mic"
        size={openButtonText.fontSize}
        color={openButtonText.color}
      />
      <Text style={openButtonText}>Record New Spot</Text>
    </TouchableOpacity>
  );
};
export default OpenBoothButton;
