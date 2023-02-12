import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import { useModal } from "../../../contexts/ModalContext";
import { SpotProvider } from "../../../contexts/SpotContext";
import { useColors } from "../../../hooks/useColorScheme";
import DeleteButton from "./DeleteButton";
import DemoCount from "./DemoCount";
import { generateStyles } from "./styles";
import TitleInput from "./TitleInput";
import TranscriptInput from "./TranscriptInput";

const SpotEditorModal = observer(() => {
  const colors = useColors();
  const {
    modalArgs: { spotId },
  } = useModal();
  const { spacer } = generateStyles(colors);
  return (
    <SpotProvider id={spotId!}>
      <TitleInput />
      <TranscriptInput />
      <DemoCount />
      <View style={spacer} />
      <DeleteButton />
    </SpotProvider>
  );
});
export default SpotEditorModal;
