import { format } from "date-fns";
import { observer } from "mobx-react";
import React from "react";
import { Text, View } from "react-native";
import useDemo from "../../../contexts/DemoContext";
import { useColors } from "../../../hooks/useColorScheme";
import { generateStyles } from "./styles";
import { generateStyles as builderStyles } from "../styles";
import CreatedDate from "./CreatedDate";
import Preview from "./Preview";
import Duration from "./Duration";
import Visibility from "./Visibility";

const Overview = observer(() => {
  const demoContext = useDemo();
  const { demo } = demoContext;
  if (!demo) {
    throw new Error(
      "Unable to provide an overview for a demo that does not exist"
    );
  }
  const { control } = builderStyles(useColors());
  const { overview } = generateStyles(useColors());
  return (
    <View style={{ ...control, ...overview }}>
      <Duration />
      <Preview />
      <CreatedDate />
      <Visibility />
    </View>
  );
});

export default Overview;
