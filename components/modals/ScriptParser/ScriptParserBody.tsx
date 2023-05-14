import AppText from "components/Controls/Text";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Sizes } from "styles/sizes";
import CharacterLine from "./CharacterLine";
import { generateStyles } from "./styles";
import useScriptParser, { CharacterState } from "./Context";
import Rejected from "./Rejected";
import ScriptPreview from "./ScriptPreview";
import { LinearGradient } from "expo-linear-gradient";
import ScrollTest from "components/ScrollTest";

const ScriptParserBody = observer(() => {
  const colors = useColors();
  const { characters } = useScriptParser();
  const { page, headerBar, body, characterSet, charactersHeader, scrollable } =
    generateStyles(colors);
  const remainingCharacters = characters.filter(
    (x) => x.status !== CharacterState.REJECTED
  );
  const headersText = `Characters (${remainingCharacters.length})`;

  return (
    <View style={page}>
      <View style={headerBar}>
        <AppText header>Script Parser</AppText>
      </View>
      <View style={body}>
        <ScrollView>
          <View style={scrollable}>
            <View style={charactersHeader}>
              <AppText header>{headersText}</AppText>
            </View>
            <View style={characterSet}>
              {remainingCharacters.map((character) => (
                <CharacterLine key={character.name} name={character.name} />
              ))}
              <Rejected />
            </View>
            <View style={charactersHeader}>
              <AppText header>Script</AppText>
            </View>
            <ScriptPreview />
          </View>
        </ScrollView>
      </View>
    </View>
  );
});

export default ScriptParserBody;
