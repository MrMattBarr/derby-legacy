import { observer } from "mobx-react";

import React, { createContext, useContext, useState } from "react";

type ProjectBuilderContract = {
  name: string;
  setName: (name: string) => void;
};

interface IContext {
  children: React.ReactNode;
}

const ProjectBuilderContext = createContext({} as ProjectBuilderContract);
export const ProjectBuilderProvider = observer(({ children }: IContext) => {
  const [name, setName] = useState("");

  const value = {
    name,
    setName,
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
