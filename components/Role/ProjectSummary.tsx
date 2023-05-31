import AppText from "components/Controls/Text";
import React from "react";
import { useColors } from "../../hooks/useColorScheme";
import { View } from "../Themed";
import { generateStyles } from "./styles";
import useProject, { ProjectProvider } from "contexts/ProjectContext";
import { useProjects } from "stores/ProjectsStore";
import Loading from "components/Demo/Loading";
import useRole from "contexts/RoleContext";

const Summary = () => {
  const colors = useColors();
  const { projectCard } = generateStyles(colors);
  const { offer: element } = useProject();
  return (
    <View style={projectCard}>
      <View>
        <AppText header>{element?.title}</AppText>
      </View>
    </View>
  );
};

const ProjectSummary = () => {
  const store = useProjects();
  const { role } = useRole();
  const id = role?.project;
  if (!id) {
    return <Loading />;
  }
  return (
    <ProjectProvider id={id} store={store}>
      <Summary />
    </ProjectProvider>
  );
};

export default ProjectSummary;
