import { observer } from "mobx-react";
import React from "react";
import { Text, View } from "react-native";
import { useColors } from "../../../hooks/useColorScheme";
import Playback from "../../Playback";
import useRecordingBooth from "./context";
import PlaybackButton from "./PlaybackButton";
import Spinner from "./Spinner";
import { generateStyles } from "./styles";
import Texts from "./texts";

const Review = observer(() => {
  const colors = useColors();
  const { header, detail, holder } = generateStyles(colors);
  const { reset } = useRecordingBooth();
  const headerText = "Got it!";
  const pleaseReview =
    "Review your audio below and make sure that it meets your expectations.";
  const nextSteps = `Once you're happy with your recording, click "${Texts.PROCEED_BUTTON}" below to save it for use. If you want to give it another go, just click "${Texts.RE_RECORD_BUTTON}"`;

  return (
    <View>
      <Text style={header}>{headerText}</Text>
      <Text style={detail}>{pleaseReview}</Text>
      <Playback>
        <Text style={detail}>Some text</Text>
      </Playback>
      <Text style={detail}>{nextSteps}</Text>
    </View>
  );
});
export default Review;
