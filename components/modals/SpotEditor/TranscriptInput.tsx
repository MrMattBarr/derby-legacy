import { observer } from "mobx-react";
import React from "react";
import { Text, TextInput, View } from "react-native";
import useSpot from "../../../contexts/SpotContext";
import { useColors } from "../../../hooks/useColorScheme";
import textStyles from "../../../styles/text";
import { generateStyles } from "./styles";

const TranscriptInput = observer(() => {
  const spotContext = useSpot();
  const { transcript } = spotContext.spot!;
  const colors = useColors();
  const { h1 } = textStyles(colors);
  const { summaryInput, control } = generateStyles(useColors());
  const update = (value: string) => {
    spotContext.update({ field: "transcript", value });
  };
  return (
    <View style={control}>
      <Text style={h1}>Transcript (Optional)</Text>
      <TextInput
        multiline
        numberOfLines={3}
        style={summaryInput}
        defaultValue={transcript}
        placeholder="Aa…"
        onChangeText={update}
      />
    </View>
  );
});

export default TranscriptInput;
