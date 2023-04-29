import Page from "components/Page";
import useUser, { UserProvider } from "contexts/UserContext";
import { observer } from "mobx-react";
import React from "react";
import { useAuth } from "stores/AuthStore";
import { ParameterPage } from "types/ParameterPage";
import Header from "./Header";
import RoleList from "./RoleList";
import ProejctList from "./ProjectList";
import SubHeader from "./Subheader";

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
        <ProejctList />
        <RoleList />
      </Page>
    </UserProvider>
  );
});

export default Projects;
