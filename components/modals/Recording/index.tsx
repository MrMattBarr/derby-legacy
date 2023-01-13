import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import NeonSign from "./NeonSign";

const RecordingModal = observer(() => {
  return (
    <View>
      <NeonSign />
    </View>
  );
});
export default RecordingModal;
