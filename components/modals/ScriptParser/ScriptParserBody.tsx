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

const ScriptParserBody = observer(() => {
  const colors = useColors();
  const { characters } = useScriptParser();
  const { page, headerBar, characterSet, body, charactersHeader } =
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
      <ScrollView style={body} contentContainerStyle={{ flex: 1 }}>
        <LinearGradient
          // Background Linear Gradient
          colors={[
            "rgba(255,0,0,0.8)",
            "rgba(255,250,0,0.8)",
            "rgba(255,0,0,0.8)",
            "rgba(255,250,0,0.8)",
          ]}
          style={{ height: 2000 }}
        />
        {/* <View style={characterSet}>
          <View style={charactersHeader}>
            <AppText header style={{ marginBottom: Sizes.Spacings.SMALL }}>
              {headersText}
            </AppText>
          </View>
          {remainingCharacters.map((character) => (
            <CharacterLine key={character.name} name={character.name} />
          ))}
          <Rejected />
        </View>
        <ScriptPreview /> */}
      </ScrollView>
    </View>
  );
});

export default ScriptParserBody;
