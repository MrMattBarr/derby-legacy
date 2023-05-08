import { useModal } from "contexts/ModalContext";
import { observer } from "mobx-react";

import React, { createContext, useContext, useEffect, useState } from "react";

export enum CharacterState {
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

  const {
    modalArgs: { scriptParserArgs },
  } = useModal();
  const { lines } = scriptParserArgs!;

  const bestGuess = () => {
    let roles = new Set<string>();
    const lineIndicator = ": ";
    const chars: Record<string, Character> = {};
    lines.forEach((line) => {
      const [baseCharacter, ...rest] = line.split(lineIndicator);
      if (rest.length === 0) {
        return;
      }
      const [name] = baseCharacter.split("\n");
      const text = rest.join(lineIndicator);
      if (!roles.has(name)) {
        roles.add(name);
        chars[name] = {
          status: CharacterState.UNKNOWN,
          lines: [],
          name,
        };
      }

      chars[name].lines.push(text);
    });
    setCharacterNames(roles);
    setCharacters(chars);
  };
  useEffect(bestGuess, [lines]);

  const confirmCharacter = (character: string) => {
    const newChars = { ...characters };
    if (newChars[character]) {
      newChars[character].status = CharacterState.CONFIRMED;
      setCharacters(newChars);
    }
  };
  const rejectCharacter = (character: string) => {
    const newChars = { ...characters };
    if (newChars[character]) {
      newChars[character].status = CharacterState.REJECTED;
      setCharacters(newChars);
    }
  };
  const dedupeCharacter = (args: IDedupe) => {};

  const characterNameList = Array.from(characterNames);
  const characterList = characterNameList.map((name) => characters[name]);

  const value = {
    characters: characterList,
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
