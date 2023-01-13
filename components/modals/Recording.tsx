import { FontAwesome } from "@expo/vector-icons";
import { observer } from "mobx-react";
import React from "react";
import { GestureResponderEvent, Modal, Pressable, View } from "react-native";
import { useColors } from "../../hooks/useColorScheme";
import { useModal } from "../../contexts/ModalContext";
import { Text } from "../Themed";
import { modalStyles } from "./styles";

const RecordingModal = observer(() => {
  const colors = useColors();
  const eatClick = (event: GestureResponderEvent) => {};

  const { background, modal, header, body } = modalStyles(colors);

  return (
    <View style={body}>
      <Text>Hi there</Text>
    </View>
  );
});
export default RecordingModal;
