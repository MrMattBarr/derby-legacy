import { observer } from "mobx-react";

import React, { createContext, useContext, useState } from "react";

type Step = {
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
  const [name, setName] = useState("");

  const steps = [
    {
      label: "Name the project",
      complete: name.trim().length > 0,
    },
    {
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
