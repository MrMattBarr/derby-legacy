import React from "react";
import { Text, View } from "react-native";
import { useColors } from "../../../hooks/useColorScheme";
import { generateStyles } from "./styles";

const Prompt = () => {
  const colors = useColors();
  const { header, detail } = generateStyles(colors);
  const headerText = "Hold the button to record";
  const detailText =
    "You can do as many retakes as you need. Remember to breathe and take your time. You'll do your best work when you're comfortable with the script and yourself. \n\nWhen you're finished, you can review your recording here.";

  return (
    <View>
      <Text style={header}>{headerText}</Text>
      <Text style={detail}>{detailText}</Text>
    </View>
  );
};
export default Prompt;
