import Page from "components/Page";
import useRole, { RoleProvider } from "contexts/RoleContext";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import { ParameterPage } from "types/ParameterPage";
import Header from "./Header";
import LineLine from "./Lines/LineLine";
import ProjectSummary from "./ProjectSummary";
import RoleLines from "./RoleLines";
import { ProjectProvider } from "contexts/ProjectContext";
import Loading from "components/Demo/Loading";
import { useProjects } from "stores/ProjectsStore";

const WrappedRole = () => {
  const { role } = useRole();
  const projectStore = useProjects();
  if (!role || !role.project) {
    return <Loading />;
  }

  return (
    <ProjectProvider id={role?.project} store={projectStore}>
      <Page unpadded>
        <Header />
        <View>
          <ProjectSummary />
          <RoleLines />
        </View>
      </Page>
    </ProjectProvider>
  );
};

const Role = observer((args?: ParameterPage) => {
  const { id } = args?.route?.params!;

  return (
    <RoleProvider id={id}>
      <WrappedRole />
    </RoleProvider>
  );
});

export default Role;
