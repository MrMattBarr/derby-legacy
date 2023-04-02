import { View } from "components/Themed";
import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { Project } from "types/Project";
import Loading from "../components/Demo/Loading";
import { ContextContract, IContext } from "./types";
const ProjectContext = React.createContext({} as ContextContract<Project>);
export const ProjectProvider = observer(
  ({ children, id, store }: IContext<Project>) => {
    useEffect(() => {
      store.load(id);
    }, [store]);
    const thing = store.things[id];
    console.log({ thing, id });
    return (
      <ProjectContext.Provider
        value={{
          element: thing,
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
