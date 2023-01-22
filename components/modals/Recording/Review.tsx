import { observer } from "mobx-react";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useColors } from "../../../hooks/useColorScheme";
import ErrorMessage from "../../controls/ErrorMessage";
import useRecordingBooth, { ErrorMessages } from "./context";
import PlaybackView from "./PlaybackView";
import { generateStyles } from "./styles";
import Texts from "./texts";

const Review = observer(() => {
  const colors = useColors();
  const { header, detail, secondaryButton, secondaryButtonText } =
    generateStyles(colors);
  const { reset, error } = useRecordingBooth();
  const headerText = "Got it!";
  const pleaseReview = "Tap the playback below to listen to your recording.";
  const nextSteps = `Once you're happy with your recording, click the button below to upload your work and start preparing it for use. If you want to give it another go, just click "${Texts.RE_RECORD_BUTTON}"`;

  return (
    <View>
      <Text style={header}>{headerText}</Text>
      <Text style={detail}>{pleaseReview}</Text>
      <PlaybackView />
      {error && (
        <ErrorMessage>
          <Text style={detail}>{ErrorMessages[error]}</Text>
        </ErrorMessage>
      )}
      {!error && <Text style={detail}>{nextSteps}</Text>}
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
