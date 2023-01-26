import { observer } from "mobx-react";
import React from "react";
import { useModal } from "../../../contexts/ModalContext";
import { SpotProvider } from "../../../contexts/SpotContext";
import { useColors } from "../../../hooks/useColorScheme";
import { Text } from "../../Themed";
import { generateStyles } from "./styles";

const SpotEditorModal = observer(() => {
  const colors = useColors();
  const {
    modalArgs: { spotId },
  } = useModal();
  const { header } = generateStyles(colors);
  return (
    <SpotProvider id={spotId!}>
      <Text style={header}>SPOT EDIT MODAL</Text>
    </SpotProvider>
  );
});
export default SpotEditorModal;
