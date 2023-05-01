import AppText from "components/Controls/Text";
import useClient from "contexts/ClientContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import useProjectBuilder from "./Context";
import { generateStyles } from "./styles";

const Header = observer(() => {
  const colors = useColors();
  const { isMobile } = useClient();

  const { name } = useProjectBuilder();

  const headerText = name.trim().length === 0 ? "New Project" : name;
  const { header } = generateStyles(colors, {
    isMobile,
  });
  return (
    <View style={header}>
      <AppText kalam header>
        {headerText}
      </AppText>
    </View>
  );
});

export default Header;
