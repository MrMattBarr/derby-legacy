import Nothing from "components/Nothing";
import useProject from "contexts/ProjectContext";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import ProjectRoleLine from "./ProjectRoleLine";

const ProjectRoles = observer(() => {
  const { element } = useProject();
  const roles = element?.roles ?? [];
  if (roles.length === 0) {
    return <Nothing />;
  }
  return (
    <View>
      {roles.map((id, index) => (
        <ProjectRoleLine key={id} id={id} />
      ))}
    </View>
  );
});

export default ProjectRoles;
