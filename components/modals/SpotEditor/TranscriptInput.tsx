import { observer } from "mobx-react";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import useSpot from "../../../contexts/SpotContext";
import { useColors } from "../../../hooks/useColorScheme";
import textStyles from "../../../styles/text";
import { generateStyles } from "./styles";

const TranscriptInput = observer(() => {
  const spotContext = useSpot();
  const [local, setLocal] = useState(spotContext.spot?.transcript);
  const colors = useColors();
  const { h1 } = textStyles(colors);
  const update = (value: string) => {
    setLocal(value);
  };

  const commit = () => {
    spotContext.update({ field: "transcript", value: local ?? "" });
  };
  const { summaryInput, control } = generateStyles(useColors());
  return (
    <View style={control}>
      <Text style={h1}>Transcript (Optional)</Text>
      <TextInput
        multiline
        numberOfLines={3}
        style={summaryInput}
        defaultValue={local}
        placeholder="Aa…"
        onChangeText={update}
        onBlur={commit}
      />
    </View>
  );
});

export default TranscriptInput;
