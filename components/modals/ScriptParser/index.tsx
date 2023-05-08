import { observer } from "mobx-react";
import React from "react";
import { ScriptParserProvider } from "./Context";
import ScriptParserBody from "./ScriptParserBody";

const ScriptParser = observer(() => {
  return (
    <ScriptParserProvider>
      <ScriptParserBody />
    </ScriptParserProvider>
  );
});

export default ScriptParser;
