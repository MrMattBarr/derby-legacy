import { observer } from "mobx-react";
import React from "react";
import { Text, View } from "react-native";
import useDemo from "../../../contexts/DemoContext";
import { useColors } from "../../../hooks/useColorScheme";
import { readableDuration } from "../../../utils/utils";
import { generateStyles } from "./styles";

const Duration = observer(() => {
  const { label, labelAndText, text } = generateStyles(useColors());
  const { duration } = useDemo();
  return (
    <View style={labelAndText}>
      <Text style={label}>Duration: </Text>
      <Text style={text}>{readableDuration(duration!)}</Text>
    </View>
  );
});

export default Duration;
