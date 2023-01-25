import { observer } from "mobx-react";
import React from "react";
import { UserProvider } from "../../contexts/UserContext";
import { useAuth } from "../../stores/AuthStore";
import { ParameterPage } from "../../types/ParameterPage";
import Page from "../Page";
import Header from "./Header";
import SpotList from "./SpotList";

const Spots = observer(({ route }: ParameterPage) => {
  const authStore = useAuth();
  const id = route?.params?.id ?? authStore.user?.uid;
  if (!id) {
    return <></>;
  }
  return (
    <UserProvider id={id}>
      <Page unpadded>
        <Header />
        <SpotList />
      </Page>
    </UserProvider>
  );
});

export default Spots;
