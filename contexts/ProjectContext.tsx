import { View } from "components/Themed";
import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { Project } from "types/Project";
import Loading from "../components/Demo/Loading";
import { ContextContract, IContext } from "./types";
import { useAuth } from "stores/AuthStore";

interface ProjectContract extends ContextContract<Project> {
  isOwner: boolean;
}

const ProjectContext = React.createContext({} as ProjectContract);
export const ProjectProvider = observer(
  ({ children, id, store }: IContext<Project>) => {
    useEffect(() => {
      store.load(id);
    }, [store]);
    const thing = store.things[id];
    const authStore = useAuth();
    const isOwner = authStore.user?.uid === thing?.owner;
    return (
      <ProjectContext.Provider
        value={{
          project: thing,
          isOwner,
        }}
      >
        {thing && children}
        {!thing && (
          <View style={{ backgroundColor: "black", padding: 10 }}>
            <Loading />
          </View>
        )}
      </ProjectContext.Provider>
    );
  }
);

const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectPovider");
  }
  return context;
};

export default useProject;
