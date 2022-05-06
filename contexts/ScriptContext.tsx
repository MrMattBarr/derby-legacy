import React, { useContext, useReducer } from "react";
import { TEST_SCRIPT } from "../testData/scripts";
import Script from "../types/Script";

type ScriptContract = {
  script: Script;
};

const ScriptContext = React.createContext({} as ScriptContract);
export const ScriptProvider = ({ children }: any) => {
  const script = TEST_SCRIPT;

  return (
    <ScriptContext.Provider value={{ script }}>
      {children}
    </ScriptContext.Provider>
  );
};

const useScript = () => {
  const context = useContext(ScriptContext);
  if (context === undefined) {
    throw new Error("useScript must be used within a ScriptProvider");
  }
  return context;
};

export default useScript;
