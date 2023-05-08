import AppText from "components/Controls/Text";
import IconButton from "components/IconButton";
import { useModal } from "contexts/ModalContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Sizes } from "styles/sizes";
import { generateStyles } from "./styles";
import ScriptParserBody from "./ScriptParserBody";
import { ScriptParserProvider } from "./Context";

const ScriptParser = observer(() => {
  return (
    <ScriptParserProvider>
      <ScriptParserBody />
    </ScriptParserProvider>
  );
});

export default ScriptParser;
