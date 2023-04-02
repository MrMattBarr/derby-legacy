import Page from "components/Page";
import Role from "components/Role";
import useUser, { UserProvider } from "contexts/UserContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import { useAuth } from "stores/AuthStore";
import { TEST_ROLES } from "testData/role";
import { ParameterPage } from "types/ParameterPage";
import Header from "./Header";
import RoleLine from "./RoleLine";
import RoleList from "./RoleList";

const Projects = observer((args?: ParameterPage) => {
  const authStore = useAuth();
  const id = args?.route?.params?.id ?? authStore.user?.uid;
  const user = useUser();
  if (!id) {
    return <></>;
  }
  console.log({ user });
  const roles = TEST_ROLES;
  return (
    <UserProvider id={id}>
      <Page unpadded>
        <Header />
        <RoleList />
      </Page>
    </UserProvider>
  );
});

export default Projects;
