import { observer } from "mobx-react";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import useDemo from "../../contexts/DemoContext";
import { useColors } from "../../hooks/useColorScheme";
import textStyles from "../../styles/text";
import { generateStyles } from "./styles";

const SummaryInput = observer(() => {
  const demoContext = useDemo();
  const [local, setLocal] = useState(demoContext.demo?.summary);
  const colors = useColors();
  const { h1 } = textStyles(colors);
  const { summaryInput, control } = generateStyles(useColors());

  const update = (value: string) => {
    setLocal(value);
  };

  const commit = () => {
    demoContext.update({ field: "summary", value: local ?? "" });
  };
  return (
    <View style={control}>
      <Text style={h1}>Description</Text>
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

export default SummaryInput;
