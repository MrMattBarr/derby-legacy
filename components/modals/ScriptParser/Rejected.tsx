import AppText from "components/Controls/Text";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import useScriptParser, { CharacterState } from "./Context";
import { generateStyles } from "./styles";

const Rejected = observer(() => {
  const colors = useColors();
  const { characters } = useScriptParser();
  const { nonCharacterSection } = generateStyles(colors);
  const statuses = characters.map((x) => x.status);
  console.log({ statuses });
  const nonCharacters = characters.filter((x) => {
    return x.status === CharacterState.REJECTED;
  });

  const nonCharacterCount = nonCharacters.length;
  const characterWord = nonCharacterCount === 1 ? "character" : "characters";

  return (
    <View style={nonCharacterSection}>
      <AppText>{`${nonCharacterCount} ${characterWord} removed`}</AppText>
    </View>
  );
});

export default Rejected;
