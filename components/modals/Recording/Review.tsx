import { observer } from "mobx-react";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useColors } from "../../../hooks/useColorScheme";
import useRecordingBooth from "./context";
import PlaybackView from "./PlaybackView";
import { generateStyles } from "./styles";
import Texts from "./texts";

const Review = observer(() => {
  const colors = useColors();
  const { header, detail, secondaryButton, secondaryButtonText } =
    generateStyles(colors);
  const { reset } = useRecordingBooth();
  const headerText = "Got it!";
  const pleaseReview =
    "Review your audio below and make sure that it meets your expectations.";
  const nextSteps = `Once you're happy with your recording, click "${Texts.PROCEED_BUTTON}" below to save it for use. If you want to give it another go, just click "${Texts.RE_RECORD_BUTTON}"`;

  return (
    <View>
      <Text style={header}>{headerText}</Text>
      <Text style={detail}>{pleaseReview}</Text>
      <PlaybackView />
      <Text style={detail}>{nextSteps}</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        style={secondaryButton}
        onPress={reset}
      >
        <Text style={secondaryButtonText}>{Texts.RE_RECORD_BUTTON}</Text>
      </TouchableOpacity>
    </View>
  );
});
export default Review;
