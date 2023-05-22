import { observer } from "mobx-react";

import React, { createContext, useContext, useState } from "react";
export enum StepNames {
  NAME = "name",
  UPLOAD_SCRIPT = "uploadScript",
}

export type Step = {
  name: StepNames;
  label: string;
  complete: boolean;
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
      name: StepNames.NAME,
      label: "Name the project",
      complete: name.trim().length > 0,
    },
    {
      name: StepNames.UPLOAD_SCRIPT,
      label: "Upload the script",
      complete: false,
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
