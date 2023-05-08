import AppText from "components/Controls/Text";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { View } from "react-native";
import { Sizes } from "styles/sizes";
import CharacterLine from "./CharacterLine";
import { generateStyles } from "./styles";
import useScriptParser, { CharacterState } from "./Context";
import Rejected from "./Rejected";

const ScriptParserBody = observer(() => {
  const colors = useColors();
  const { characters } = useScriptParser();
  const { page, headerBar, characterSet, body } = generateStyles(colors);
  const charactersHeader = `Characters (${characters.length})`;

  const remainingCharacters = characters.filter(
    (x) => x.status !== CharacterState.REJECTED
  );

  return (
    <View style={page}>
      <View style={headerBar}>
        <AppText header>Script Parser</AppText>
      </View>
      <View style={body}>
        <AppText header style={{ marginBottom: Sizes.Spacings.SMALL }}>
          {charactersHeader}
        </AppText>
        <View style={characterSet}>
          {remainingCharacters.map((character) => (
            <CharacterLine key={character.name} name={character.name} />
          ))}
        </View>
        <Rejected />
      </View>
    </View>
  );
});

export default ScriptParserBody;
