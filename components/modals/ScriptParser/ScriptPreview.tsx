import AppText from "components/Controls/Text";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import useScriptParser, { CharacterState } from "./Context";
import { generateStyles } from "./styles";
import ScriptLine from "./ScriptLine";

const ScriptPreview = observer(() => {
  const colors = useColors();
  const { lineIds } = useScriptParser();
  const { scriptPreview } = generateStyles(colors);

  return (
    <View style={scriptPreview}>
      {lineIds.map((id) => (
        <ScriptLine key={id} id={id} />
      ))}
    </View>
  );
});

export default ScriptPreview;
