import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import { useColors } from "../../../hooks/useColorScheme";
import BigButton from "./BigButton";
import { RecordingBoothProvider } from "./context";
import NeonSign from "./NeonSign";
import { generateStyles } from "./styles";

const RecordingModal = observer(() => {
  const colors = useColors();
  const { booth } = generateStyles(colors);
  return (
    <RecordingBoothProvider>
      <View style={booth}>
        <NeonSign />
        <BigButton />
      </View>
    </RecordingBoothProvider>
  );
});
export default RecordingModal;
