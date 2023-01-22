import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import { useColors } from "../../../hooks/useColorScheme";
import MicButton from "./MicButton";
import { RecordingBoothProvider } from "./context";
import NeonSign from "./NeonSign";
import PlaybackBox from "./PlaybackBox";
import { generateStyles } from "./styles";
import BottomButton from "./BottomButton";

const RecordingModal = observer(() => {
  const colors = useColors();
  const { booth, center } = generateStyles(colors);
  return (
    <RecordingBoothProvider>
      <View style={booth}>
        <NeonSign />
        <View style={center}>
          <PlaybackBox />
        </View>
        <BottomButton />
      </View>
    </RecordingBoothProvider>
  );
});
export default RecordingModal;
