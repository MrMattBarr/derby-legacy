import { observer } from "mobx-react";
import React from "react";
import { Pressable } from "react-native";
import { generateStyles } from "./styles";
import { ModalKey } from "config/ModalKeys";
import { useModal } from "contexts/ModalContext";
import useSpot from "contexts/SpotContext";
import { useColors } from "hooks/useColorScheme";
import AppText from "components/Controls/Text";

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
      <AppText style={deleteText}>Delete Spot</AppText>
    </Pressable>
  );
});
export default DeleteButton;
