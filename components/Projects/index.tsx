import Page from "components/Page";
import { UserProvider } from "contexts/UserContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import { useAuth } from "stores/AuthStore";
import { ParameterPage } from "types/ParameterPage";
import Header from "./Header";
import RoleLine from "./RoleLine";

const Projects = observer((args?: ParameterPage) => {
  const authStore = useAuth();
  const id = args?.route?.params?.id ?? authStore.user?.uid;
  if (!id) {
    return <></>;
  }
  return (
    <UserProvider id={id}>
      <Page unpadded>
        <Header />
        <View>
          <RoleLine />
          <RoleLine />
          <RoleLine />
          <RoleLine />
        </View>
      </Page>
    </UserProvider>
  );
});

export default Projects;
