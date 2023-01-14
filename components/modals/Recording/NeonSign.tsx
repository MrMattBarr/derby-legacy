import { FontAwesome } from "@expo/vector-icons";
import { observer } from "mobx-react";
import React from "react";
import { GestureResponderEvent, Modal, Pressable, View } from "react-native";
import { useColors } from "../../../hooks/useColorScheme";
import { useModal } from "../../../contexts/ModalContext";
import { Text } from "../../Themed";
import { modalStyles } from "../styles";
import { generateStyles } from "./styles";
import useRecordingBooth from "./context";

const RecordingModal = observer(() => {
  const { recording } = useRecordingBooth();
  const colors = useColors();

  const { sign, signText } = generateStyles(colors, { recording });

  return (
    <View style={sign}>
      <Text style={signText}>RECORDING</Text>
    </View>
  );
});
export default RecordingModal;
