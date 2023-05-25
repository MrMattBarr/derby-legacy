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

  const roles = Object.keys(element?.roles ?? {});
  const colors = useColors();
  const { rolesContainer, rolesContainerHolder, expanderColumn } =
    generateStyles(colors);
  if (roles.length === 0) {
    return <Nothing />;
  }
  return (
    <View style={rolesContainerHolder}>
      <View style={expanderColumn} />
      <View style={rolesContainer}>
        {roles.map((id) => (
          <ProjectRoleLine key={id} id={id} />
        ))}
      </View>
    </View>
  );
});

export default ProjectRoles;
