import BigButton from "components/Buttons/BigButton";
import AppText from "components/Controls/Text";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React from "react";
import { ScrollView, View } from "react-native";
import CharacterLine from "./CharacterLine";
import useScriptParser, { CharacterState } from "./Context";
import Rejected from "./Rejected";
import ScriptPreview from "./ScriptPreview";
import { generateStyles } from "./styles";

const ScriptParserBody = observer(() => {
  const colors = useColors();
  const { characters, finalize, title } = useScriptParser();
  const {
    page,
    headerBar,
    body,
    button,
    characterSet,
    charactersHeader,
    scrollable,
  } = generateStyles(colors);
  const remainingCharacters = characters.filter(
    (x) => x.status !== CharacterState.REJECTED
  );
  const headersText = `Characters (${remainingCharacters.length})`;

  return (
    <View style={page}>
      <View style={headerBar}>
        <AppText header>{`${title} (draft)`}</AppText>
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
        <BigButton style={button} label="Finalize" onPress={finalize} />
      </View>
    </View>
  );
});

export default ScriptParserBody;
