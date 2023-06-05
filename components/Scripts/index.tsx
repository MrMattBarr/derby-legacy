import AppText from "components/Controls/Text";
import Loading from "components/Loading";
import Page from "components/Page";
import useProject, { ProjectProvider } from "contexts/ProjectContext";
import { observer } from "mobx-react";
import React from "react";
import { useProjects } from "stores/ProjectsStore";
import { ParameterPage } from "types/ParameterPage";
import ScriptLine from "./ScriptLine";
import { useColors } from "hooks/useColorScheme";
import { generateStyles } from "./styles";
import { View } from "components/Themed";
import { ScrollView } from "react-native";
import Header from "./Header";

const WrappedScript = () => {
  const { project } = useProject();
  const colors = useColors();
  const { scriptPreview, body, page } = generateStyles(colors);
  if (!project) {
    return <Loading />;
  }
  return (
    <View style={page}>
      <Header />
      <View style={body}>
        <ScrollView>
          <View style={scriptPreview}>
            {(project?.lines ?? []).map((id) => (
              <ScriptLine key={id} id={id} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const ProjectScript = observer((args?: ParameterPage) => {
  const projectStore = useProjects();
  const id = args?.route?.params?.id;
  if (!id) {
    return <></>;
  }
  return (
    <ProjectProvider store={projectStore} id={id}>
      <WrappedScript />
    </ProjectProvider>
  );
});

export default ProjectScript;
