import { toJS } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Text, TextInput, View } from "react-native";
import useDemo from "../../contexts/DemoContext";
import { useColors } from "../../hooks/useColorScheme";
import textStyles from "../../styles/text";
import { generateStyles } from "./styles";

const TitleInput = observer(() => {
  const demoContext = useDemo();
  console.log(toJS(demoContext.demo));
  const { title } = demoContext.demo!;
  const colors = useColors();
  const { h1 } = textStyles(colors);
  const { titleInput, control } = generateStyles(useColors());
  const update = (value: string) => {
    demoContext.update({ field: "title", value });
  };
  return (
    <View style={control}>
      <Text style={h1}>Demo Title</Text>
      <TextInput
        style={titleInput}
        defaultValue={title}
        placeholder="Aa…"
        onChangeText={update}
      />
    </View>
  );
});

export default TitleInput;
