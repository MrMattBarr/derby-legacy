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
  const nonCharacterCount = characters.filter((x) => {
    x.status === CharacterState.REJECTED;
  }).length;
  const characterWord = nonCharacterCount === 1 ? "character" : "characters";

  return (
    <View style={nonCharacterSection}>
      <AppText>{`${nonCharacterCount} ${characterWord} removed`}</AppText>
    </View>
  );
});

export default Rejected;
