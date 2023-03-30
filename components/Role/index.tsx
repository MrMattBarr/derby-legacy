import Page from "components/Page";
import { RoleProvider } from "contexts/RoleContext";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import { ParameterPage } from "types/ParameterPage";
import Header from "./Header";
import LineLine from "./Lines/LineLine";
import ProjectSummary from "./ProjectSummary";
import RoleLines from "./RoleLines";

const Role = observer((args?: ParameterPage) => {
  const { id } = args?.route?.params!;

  return (
    <RoleProvider id={id}>
      <Page unpadded>
        <Header />
        <View>
          <ProjectSummary />
          <RoleLines />
        </View>
      </Page>
    </RoleProvider>
  );
});

export default Role;
