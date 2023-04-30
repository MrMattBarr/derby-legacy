import AppText from "components/Controls/Text";
import Page from "components/Page";
import { UserProvider } from "contexts/UserContext";
import { observer } from "mobx-react";
import React from "react";
import { useAuth } from "stores/AuthStore";
import { ParameterPage } from "types/ParameterPage";

const ProjectBuilder = observer((args?: ParameterPage) => {
  const authStore = useAuth();
  const id = args?.route?.params?.id ?? authStore.user?.uid;
  if (!id) {
    return <></>;
  }
  return (
    <UserProvider id={id}>
      <Page>
        <AppText>Project Builder</AppText>
      </Page>
    </UserProvider>
  );
});

export default ProjectBuilder;
