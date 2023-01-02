import { observer } from "mobx-react";
import React from "react";
import { Text, View } from "react-native";
import { useColors } from "../../../hooks/useColorScheme";
import { generateStyles } from "./styles";

const Duration = observer(() => {
  const { label, labelAndText } = generateStyles(useColors());
  return (
    <View style={labelAndText}>
      <Text style={label}>Duration coming soon</Text>
    </View>
  );
});

export default Duration;
