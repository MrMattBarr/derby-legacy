import useClient from "contexts/ClientContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React from "react";
import { Text, View } from "react-native";
import textStyles from "styles/text";
import { generateStyles } from "./styles";

const Header = observer(() => {
  const colors = useColors();
  const { isMobile } = useClient();
  const text = textStyles(colors);
  const { header } = generateStyles(colors, {
    isMobile,
  });
  return (
    <View style={header}>
      <Text style={text.h1}>Lord Dracula</Text>
      <Text style={text.text}>0 / 23 lines complete</Text>
    </View>
  );
});

export default Header;
