import { observer } from "mobx-react";
import React from "react";
import { useModal } from "../../../contexts/ModalContext";
import { SpotProvider } from "../../../contexts/SpotContext";
import { useColors } from "../../../hooks/useColorScheme";
import { generateStyles } from "./styles";
import TitleInput from "./TitleInput";

const SpotEditorModal = observer(() => {
  const colors = useColors();
  const {
    modalArgs: { spotId },
  } = useModal();
  const { header } = generateStyles(colors);
  return (
    <SpotProvider id={spotId!}>
      <TitleInput />
    </SpotProvider>
  );
});
export default SpotEditorModal;
