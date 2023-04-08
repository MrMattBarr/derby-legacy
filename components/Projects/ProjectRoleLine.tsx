import AppText from "components/Controls/Text";
import Loading from "components/Demo/Loading";

import { View } from "components/Themed";
import useRole, { RoleProvider } from "contexts/RoleContext";
import React from "react";

const ProjectRoleSummary = () => {
  const { role } = useRole();
  if (!role) {
    return <Loading />;
  }

  return (
    <View>
      <AppText>{role.name}</AppText>
    </View>
  );
};

const ProjectRoleLine = ({ id }: { id: string }) => {
  if (!id) {
    return <Loading />;
  }

  return (
    <RoleProvider id={id}>
      <ProjectRoleSummary />
    </RoleProvider>
  );
};

export default ProjectRoleLine;
