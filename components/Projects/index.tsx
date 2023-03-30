import Page from "components/Page";
import Role from "components/Role";
import { UserProvider } from "contexts/UserContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import { useAuth } from "stores/AuthStore";
import { TEST_ROLES } from "testData/role";
import { ParameterPage } from "types/ParameterPage";
import Header from "./Header";
import RoleLine from "./RoleLine";

const Projects = observer((args?: ParameterPage) => {
  const authStore = useAuth();
  const id = args?.route?.params?.id ?? authStore.user?.uid;
  if (!id) {
    return <></>;
  }

  const roles = TEST_ROLES;
  return (
    <UserProvider id={id}>
      <Page unpadded>
        <Header />
        <View>
          {roles.map((role) => {
            return <RoleLine key={role.id} role={role} />;
          })}
        </View>
      </Page>
    </UserProvider>
  );
});

export default Projects;
