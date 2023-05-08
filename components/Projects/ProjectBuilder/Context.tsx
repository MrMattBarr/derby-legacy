import { observer } from "mobx-react";

import React, { ReactNode, createContext, useContext, useState } from "react";
import ScriptReceiver from "./ScriptReceiver";

type Step = {
  label: string;
  complete: boolean;
  component?: () => JSX.Element;
};

type ProjectBuilderContract = {
  name: string;
  setName: (name: string) => void;
  steps: Step[];
};

interface IContext {
  children: React.ReactNode;
}

const ProjectBuilderContext = createContext({} as ProjectBuilderContract);
export const ProjectBuilderProvider = observer(({ children }: IContext) => {
  const [name, setName] = useState("Test Project");

  const steps: Step[] = [
    {
      label: "Name the project",
      complete: name.trim().length > 0,
    },
    {
      label: "Upload the script",
      complete: false,
      component: ScriptReceiver,
    },
  ];

  const value = {
    name,
    setName,
    steps,
  };

  return (
    <ProjectBuilderContext.Provider value={value}>
      {children}
    </ProjectBuilderContext.Provider>
  );
});

const useProjectBuilder = () => {
  const context = useContext(ProjectBuilderContext);
  if (context === undefined) {
    throw new Error(
      "useProjectBuilder must be used within a useProjectBuilder"
    );
  }
  return context;
};

export default useProjectBuilder;
