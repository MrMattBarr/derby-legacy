import Page from "components/Page";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import { ParameterPage } from "types/ParameterPage";
import Header from "./Header";
import LineLine from "./Lines/LineLine";
import ProjectSummary from "./ProjectSummary";

const Role = observer((args?: ParameterPage) => {
  return (
    <Page unpadded>
      <Header />
      <View>
        <ProjectSummary />
        <LineLine />
        <LineLine />
        <LineLine />
        <LineLine />
        <LineLine />
        <LineLine />
        <LineLine />
      </View>
    </Page>
  );
});

export default Role;
