import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import usePlayback from "../../../contexts/PlaybackContext";
import { useColors } from "../../../hooks/useColorScheme";
import Nothing from "../../Nothing";
import useRecordingBooth, { RecordingState } from "./context";
import MicButton from "./MicButton";
import SaveButton from "./SaveButton";
import { generateStyles } from "./styles";

const contentMap = {
  [RecordingState.READY]: MicButton,
  [RecordingState.RECORDING]: MicButton,
  [RecordingState.REVIEW]: SaveButton,
  [RecordingState.POST]: MicButton,
};

const BottomButton = observer(() => {
  const { recording, recordingState } = useRecordingBooth();
  const colors = useColors();
  const Content = contentMap[recordingState];

  return (
    <View>
      <Content />
    </View>
  );
});
export default BottomButton;
