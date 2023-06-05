import AppText from "components/Controls/Text";
import Loading from "components/Demo/Loading";
import { useColors } from "hooks/useColorScheme";
import React from "react";
import { View } from "react-native";
import useScriptParser from "./Context";
import { generateStyles } from "./styles";

const ScriptLine = ({ id }: { id: string }) => {
  const { lines, characters } = useScriptParser();
  const line = lines[id];
  const colors = useColors();
  const character = characters.find((x) => x.name === line.character);
  if (!line) {
    return <Loading />;
  }

  const characterColor = character?.color;
  const { scriptLine, lineCharacter, lineTextHolder } = generateStyles(colors, {
    characterColor,
  });

  console.log({ line });

  return (
    <View style={scriptLine}>
      {line.character && (
        <View style={lineCharacter}>
          <AppText header>{line.character}</AppText>
        </View>
      )}
      <View style={lineTextHolder}>
        <AppText>{line.text}</AppText>
      </View>
    </View>
  );
};
export default ScriptLine;
