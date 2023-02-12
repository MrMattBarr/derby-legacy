import { observer } from "mobx-react";
import React from "react";
import { Pressable } from "react-native";
import { ModalKey, useModal } from "../../../contexts/ModalContext";
import useSpot, { SpotProvider } from "../../../contexts/SpotContext";
import { useColors } from "../../../hooks/useColorScheme";
import { Text } from "../../Themed";
import { generateStyles } from "./styles";
import TitleInput from "./TitleInput";
import TranscriptInput from "./TranscriptInput";

const DeleteButton = observer(() => {
  const colors = useColors();
  const modals = useModal();
  const spot = useSpot();
  const { deleteButton, deleteText } = generateStyles(colors);
  const deleteSpot = () => {
    modals.setModal(ModalKey.NONE);
    spot.deleteSpot();
  };
  return (
    <Pressable style={deleteButton} onPress={deleteSpot}>
      <Text style={deleteText}>Delete Spot</Text>
    </Pressable>
  );
});
export default DeleteButton;
