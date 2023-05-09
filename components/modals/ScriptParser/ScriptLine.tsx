import AppText from "components/Controls/Text";
import IconButton from "components/IconButton";
import { useColors } from "hooks/useColorScheme";
import React from "react";
import { View } from "react-native";
import { Sizes } from "styles/sizes";
import { generateStyles } from "./styles";
import useScriptParser, { CharacterState } from "./Context";
import Loading from "components/Demo/Loading";

const ScriptLine = ({ id }: { id: string }) => {
  const { lines, characters } = useScriptParser();
  const line = lines[id];
  const colors = useColors();
  const character = characters.find((x) => x.name === line.character);
  if (!line) {
    return <Loading />;
  }

  const characterColor = character?.color;
  const { scriptLine, lineText, lineCharacter, lineTextHolder } =
    generateStyles(colors, {
      characterColor,
    });

  return (
    <View style={scriptLine}>
      {line.character && (
        <View style={lineCharacter}>
          <AppText header>{line.character}</AppText>
        </View>
      )}
      <View style={lineTextHolder}>
        <AppText style={lineText}>{line.text}</AppText>
      </View>
    </View>
  );
};
export default ScriptLine;
