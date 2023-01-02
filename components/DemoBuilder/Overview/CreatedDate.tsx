import { format } from "date-fns";
import { observer } from "mobx-react";
import React from "react";
import { Text, View } from "react-native";
import useDemo from "../../../contexts/DemoContext";
import { useColors } from "../../../hooks/useColorScheme";
import { generateStyles } from "./styles";

const CreatedDate = observer(() => {
  const demoContext = useDemo();
  const { demo } = demoContext;
  const { label, text, labelAndText } = generateStyles(useColors());
  if (!demo) {
    return <Text style={text}>No Demo Found</Text>;
  }
  const readableCreated = demo?.created
    ? format(demo.created, "PPP")
    : "unknown";
  return (
    <View style={labelAndText}>
      <Text style={label}>Created: </Text>
      <Text style={text}>{readableCreated}</Text>
    </View>
  );
});

export default CreatedDate;
