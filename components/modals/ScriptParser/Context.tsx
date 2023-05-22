import { AppColor } from "constants/Colors";
import { useModal } from "contexts/ModalContext";
import { observer } from "mobx-react";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "stores/AuthStore";
import { useLines } from "stores/LinesStore";
import { useProjects } from "stores/ProjectsStore";
import { useRoles } from "stores/RolesStore";
import { Project } from "types/Project";
import { Role } from "types/Role";
import { ApprovalStatus } from "types/Take";
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
  color?: AppColor;
};

interface IDedupe {
  original: string;
  duplicate: string;
}

interface ParsedLine {
  character?: string;
  text: string;
  dbId?: string;
}

type ScriptParserContract = {
  characters: Character[];
  rejectCharacter: (character: string) => void;
  confirmCharacter: (character: string) => void;
  finalize: () => Promise<void>;
  title: string;
  dedupeCharacter: ({ original, duplicate }: IDedupe) => void;
  lineIds: string[];
  lines: Record<string, ParsedLine>;
};

interface IContext {
  children: React.ReactNode;
}

const RoleColors = [
  AppColor.HAT_RED,
  AppColor.NAVY_BLUE,
  AppColor.AQUA,
  AppColor.DIRTY_GOLD,
  AppColor.AQUA,
  AppColor.PLUM,
];

const ScriptParserContext = createContext({} as ScriptParserContract);
export const ScriptParserProvider = observer(({ children }: IContext) => {
  const [characterNames, setCharacterNames] = useState<Set<string>>(
    new Set<string>()
  );
  const [characters, setCharacters] = useState<Record<string, Character>>({});
  const rolesStore = useRoles();
  const projectStore = useProjects();
  const linesStore = useLines();
  const authStore = useAuth();
  const [parsedLines, setParsedLines] = useState<Record<string, ParsedLine>>(
    {}
  );
  const [lineIds, setLineIds] = useState<string[]>([]);

  const {
    modalArgs: { scriptParserArgs },
  } = useModal();
  const { lines, title } = scriptParserArgs!;

  const characterNameList = Array.from(characterNames);
  const characterList = characterNameList.map((name) => characters[name]);

  const bestGuess = () => {
    let roles = new Set<string>();
    const lineIndicator = ": ";
    const allParsedIds: string[] = [];
    const chars: Record<string, Character> = {};
    const allParsedLines: Record<string, ParsedLine> = {};
    lines.forEach((line) => {
      const [baseCharacter, ...rest] = line.split(lineIndicator);
      const id = `${Math.random()}`;
      allParsedIds.push(id);
      if (rest.length === 0) {
        allParsedLines[id] = {
          text: baseCharacter,
        };
        return;
      }
      const [name, ...restOfName] = baseCharacter.split("\n");
      const restOfNameString = restOfName.join("\n");
      const restOfText = rest.join(lineIndicator);
      const text = restOfNameString
        ? [restOfNameString, restOfText].join(lineIndicator)
        : restOfText;
      if (!roles.has(name)) {
        roles.add(name);
        chars[name] = {
          status: CharacterState.UNKNOWN,
          lines: [],
          name,
        };
      }

      allParsedLines[id] = {
        text,
        character: name,
      };
      chars[name].lines.push(id);
    });
    setCharacterNames(roles);
    setCharacters(chars);
    setLineIds(allParsedIds);
    setParsedLines(allParsedLines);
  };
  useEffect(bestGuess, [lines]);

  const confirmCharacter = (character: string) => {
    const newChars = { ...characters };
    if (newChars[character]) {
      const claimedColors = characterList.map((c) => c.color);
      const nextColor = RoleColors.find(
        (color) => !claimedColors.includes(color)
      );
      newChars[character].status = CharacterState.CONFIRMED;
      newChars[character].color = nextColor ?? AppColor.TRANSPARENT;
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

  const finalize = async () => {
    const partialProject: Partial<Project> = {
      title,
      owner: authStore.user?.uid!,
      roles: [],
    };

    const project = await projectStore.create(partialProject);
    return;

    const roleIdByName: Record<string, string> = {};

    const promises = [...characterNames].map((name) => {
      return new Promise((resolve, reject) => {
        const character = characters[name];
        if (character.status !== CharacterState.CONFIRMED) {
          resolve(undefined);
          return;
        }
        const partialRole: Partial<Role> = {
          name,
          color: character.color,
          project: project.id,
          lines: [],
        };

        rolesStore.create(partialRole).then((role) => {
          resolve({ name, role: role.id });
        });
      });
    });

    const results = (await Promise.all(promises)).filter((x) => !!x);
    results.forEach((mapping: any) => {
      if (mapping?.role) {
        roleIdByName[mapping.name] = mapping.role;
      }
    });

    const linePromises = [...lineIds].map((lineId) => {
      return new Promise((resolve, reject) => {
        lineIds.forEach((lineId) => {
          const lineDraft = parsedLines[lineId];
          const role = lineDraft.character
            ? roleIdByName[lineDraft.character]
            : undefined;

          resolve(true);
          linesStore
            .create({
              role,
              text: lineDraft.text,
              status: ApprovalStatus.UNHEARD,
              takes: [],
            })
            .then((line) => resolve(line));
        });
      });
    });

    const lines = await Promise.all(linePromises);
    console.log({ lineCount: lineIds.length, lines: lines.length });
  };

  const value = {
    characters: characterList,
    rejectCharacter,
    confirmCharacter,
    dedupeCharacter,
    lineIds,
    title,
    finalize,
    lines: parsedLines,
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
