import Nothing from "components/Nothing";
import useProject from "contexts/ProjectContext";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import ProjectRoleLine from "./ProjectRoleLine";
import { useColors } from "hooks/useColorScheme";
import { generateStyles } from "./styles";

const ProjectRoles = observer(() => {
  const { element } = useProject();
  const roles = element?.roles ?? [];
  const colors = useColors();
  const { rolesContainer } = generateStyles(colors);
  if (roles.length === 0) {
    return <Nothing />;
  }
  return (
    <View style={rolesContainer}>
      {roles.map((id) => (
        <ProjectRoleLine key={id} id={id} />
      ))}
    </View>
  );
});

export default ProjectRoles;
