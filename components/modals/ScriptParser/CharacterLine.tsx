import AppText from "components/Controls/Text";
import IconButton from "components/IconButton";
import { useColors } from "hooks/useColorScheme";
import React from "react";
import { View } from "react-native";
import { Sizes } from "styles/sizes";
import { generateStyles } from "./styles";
import useScriptParser, { CharacterState } from "./Context";
import Loading from "components/Demo/Loading";

const CharacterLine = ({ name }: { name: string }) => {
  const colors = useColors();
  const { characters, rejectCharacter, confirmCharacter } = useScriptParser();
  const character = characters.find((x) => x.name === name);
  if (!character) {
    return <Loading />;
  }
  const lineCount = character.lines.length;
  const lineWord = lineCount === 1 ? "line" : "lines";
  const confirmed = character.status === CharacterState.CONFIRMED;
  const characterColor = character.color;
  const { characterLine, titleText, smallText, buttons } = generateStyles(
    colors,
    { confirmed, characterColor }
  );

  return (
    <View key={name} style={characterLine}>
      <View>
        <AppText style={titleText}>{name}</AppText>
        <AppText style={smallText}>{`${lineCount} ${lineWord}`}</AppText>
      </View>
      {character.status === CharacterState.UNKNOWN && (
        <View style={buttons}>
          <IconButton
            onPress={() => rejectCharacter(name)}
            color={colors.Text.subtle}
            style={{ marginRight: Sizes.Spacings.STANDARD }}
            icon="remove-user"
          />
          <IconButton
            color={colors.Text.complete}
            background={colors.Backgrounds.complete}
            onPress={() => confirmCharacter(name)}
            icon="check"
          />
        </View>
      )}
    </View>
  );
};
export default CharacterLine;
