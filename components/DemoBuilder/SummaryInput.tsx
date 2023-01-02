import { observer } from "mobx-react";
import React from "react";
import { Text, TextInput, View } from "react-native";
import useDemo from "../../contexts/DemoContext";
import { useColors } from "../../hooks/useColorScheme";
import textStyles from "../../styles/text";
import { generateStyles } from "./styles";

const SummaryInput = observer(() => {
  const demoContext = useDemo();
  const { summary } = demoContext.demo!;
  const colors = useColors();
  const { h1 } = textStyles(colors);
  const { summaryInput, control } = generateStyles(useColors());
  const update = (value: string) => {
    demoContext.update({ field: "summary", value });
  };
  return (
    <View style={control}>
      <Text style={h1}>Description</Text>
      <TextInput
        multiline
        numberOfLines={3}
        style={summaryInput}
        defaultValue={summary}
        placeholder="Aa…"
        onChangeText={update}
      />
    </View>
  );
});

export default SummaryInput;
