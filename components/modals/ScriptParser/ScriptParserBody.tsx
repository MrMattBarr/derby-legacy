import AppText from "components/Controls/Text";
import IconButton from "components/IconButton";
import { useModal } from "contexts/ModalContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Sizes } from "styles/sizes";
import { generateStyles } from "./styles";

const ScriptParserBody = observer(() => {
  const colors = useColors();
  const {
    page,
    headerBar,
    characterSet,
    characterLine,
    body,
    titleText,
    nonCharacterSection,
    smallText,
    buttons,
  } = generateStyles(colors);
  const [characters, setCharacters] = useState<Set<string>>(new Set<string>());
  const [linesByCharacter, setLinesByCharacters] = useState<
    Record<string, string[]>
  >({});

  const [nonCharacters, setNonCharacters] = useState<Set<string>>(
    new Set<string>()
  );

  const {
    modalArgs: { scriptParserArgs },
  } = useModal();
  const { lines } = scriptParserArgs!;

  const bestGuess = () => {
    let roles = new Set<string>();
    const lineIndicator = ": ";
    const lbc: Record<string, string[]> = {};
    lines.forEach((line) => {
      const [baseCharacter, ...rest] = line.split(lineIndicator);
      if (rest.length === 0) {
        return;
      }
      const [character] = baseCharacter.split("\n");
      const text = rest.join(lineIndicator);
      if (!roles.has(character)) {
        roles.add(character);
        lbc[character] = [];
      }

      lbc[character].push(text);
    });
    setLinesByCharacters(lbc);
    setCharacters(roles);
  };
  useEffect(bestGuess, [lines]);

  const charactersHeader = `Characters (${characters.size})`;
  const characterList = Array.from(characters);

  const removeCharacter = (character: string) => {
    const newCharacters = new Set(characters);
    const newNonCharacters = new Set(nonCharacters);
    newCharacters.delete(character);
    newNonCharacters.add(character);
    setCharacters(newCharacters);
    setNonCharacters(newNonCharacters);
  };

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
          {characterList.map((character) => (
            <View key={character} style={characterLine}>
              <View>
                <AppText style={titleText}>{character}</AppText>
                <AppText style={smallText}>{`${
                  ((linesByCharacter || {})[character] || {}).length
                } line(s)`}</AppText>
              </View>
              <View style={buttons}>
                <IconButton
                  onPress={() => removeCharacter(character)}
                  color={colors.Text.subtle}
                  style={{ marginRight: Sizes.Spacings.STANDARD }}
                  icon="remove-user"
                />
                <IconButton
                  color={colors.Text.complete}
                  background={colors.Backgrounds.complete}
                  onPress={() => {}}
                  icon="check"
                />
              </View>
            </View>
          ))}

          <View style={nonCharacterSection}>
            <AppText>{`${nonCharacters.size} character(s) removed`}</AppText>
          </View>
        </View>
      </View>
    </View>
  );
});

export default ScriptParserBody;
