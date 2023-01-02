import { observer } from "mobx-react";
import React from "react";
import { Text, View } from "react-native";
import { useColors } from "../../../hooks/useColorScheme";
import { generateStyles } from "./styles";

const Preview = observer(() => {
  const { label, labelAndText } = generateStyles(useColors());
  return (
    <View style={labelAndText}>
      <Text style={label}>Preview coming soon</Text>
    </View>
  );
});

export default Preview;
