import { observer } from "mobx-react";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import useSpot from "../../../contexts/SpotContext";
import { useColors } from "../../../hooks/useColorScheme";
import textStyles from "../../../styles/text";
import { generateStyles } from "./styles";

const TitleInput = observer(() => {
  const spotContext = useSpot();
  const [local, setLocal] = useState(spotContext.spot?.title);
  const colors = useColors();
  const { titleInput, control, header } = generateStyles(useColors());
  const update = (value: string) => {
    setLocal(value);
  };

  const commit = () => {
    spotContext.update({ field: "title", value: local ?? "" });
  };
  return (
    <View style={control}>
      <Text style={header}>Spot Title</Text>
      <TextInput
        style={titleInput}
        defaultValue={local}
        placeholder="Aa…"
        onChangeText={update}
        onBlur={commit}
      />
    </View>
  );
});

export default TitleInput;
