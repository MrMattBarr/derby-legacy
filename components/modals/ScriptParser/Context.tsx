import { observer } from "mobx-react";

import React, { ReactNode, createContext, useContext, useState } from "react";

enum CharacterState {
  CONFIRMED = "confirmed",
  UNKNOWN = "unknown",
  REJECTED = "rejected",
  DEDUPED = "deduped",
}

type Character = {
  name: string;
  status: CharacterState;
  lines: string[];
};

interface IDedupe {
  original: string;
  duplicate: string;
}

type ScriptParserContract = {
  characters: Character[];
  rejectCharacter: (character: string) => void;
  confirmCharacter: (character: string) => void;
  dedupeCharacter: ({ original, duplicate }: IDedupe) => void;
};

interface IContext {
  children: React.ReactNode;
}

const ScriptParserContext = createContext({} as ScriptParserContract);
export const ScriptParserProvider = observer(({ children }: IContext) => {
  const [characterNames, setCharacterNames] = useState<Set<string>>(
    new Set<string>()
  );
  const [characters, setCharacters] = useState<Record<string, Character>>({});

  const confirmCharacter = (character: string) => {};
  const rejectCharacter = (character: string) => {};
  const dedupeCharacter = (args: IDedupe) => {};

  const characterNameList = Array.from(characterNames);

  const value = {
    characters: characterNameList.map((name) => characters[name]),
    rejectCharacter,
    confirmCharacter,
    dedupeCharacter,
  };

  return (
    <ScriptParserContext.Provider value={value}>
      {children}
    </ScriptParserContext.Provider>
  );
});

const useScriptParser = () => {
  const context = useContext(ScriptParserContext);
  if (context === undefined) {
    throw new Error(
      "useScriptParser must be used within a ScriptParserContext"
    );
  }
  return context;
};

export default useScriptParser;
