import { useLocalObservable } from "mobx-react";
import React from "react";
import { Project } from "types/Project";
import { DB } from "types/apiHelpers";
import { Store, createStoreContext, useThings } from "./Store";

export const ProjectStore = Store<Project>;
export const ProjectsContext = createStoreContext<Project>();

export const ProjectsStoreProvider = ({ children }: any) => {
  const store = useLocalObservable(() => ProjectStore(DB.PROJECT));
  return (
    <ProjectsContext.Provider value={store}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  return useThings(ProjectsContext, "useProject");
};
