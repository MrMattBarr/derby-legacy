import { observer } from "mobx-react";
import React from "react";
import { Text, View } from "react-native";
import useDemo from "../../../contexts/DemoContext";
import { useColors } from "../../../hooks/useColorScheme";
import { generateStyles } from "./styles";

const Duration = observer(() => {
  const { label, labelAndText, text } = generateStyles(useColors());
  const { readableDuration } = useDemo();
  return (
    <View style={labelAndText}>
      <Text style={label}>Duration: </Text>
      <Text style={text}>{readableDuration}</Text>
    </View>
  );
});

export default Duration;
