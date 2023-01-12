import { toJS } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Text } from "react-native";
import { UserProvider } from "../../contexts/UserContext";
import useColorScheme from "../../hooks/useColorScheme";
import { useAuth } from "../../stores/AuthStore";
import { useDemos } from "../../stores/DemosStore";
import { ParameterPage } from "../../types/ParameterPage";
import Page from "../Page";
import Header from "./Header";
import UserDemoList from "./UserDemoList";

const Demos = observer(({ route }: ParameterPage) => {
  const demos = useDemos();
  const demoIds = toJS(demos.demoIds);
  const authStore = useAuth();
  const id = route?.params?.id ?? authStore.user?.uid;
  const colorScheme = useColorScheme();
  if (!id) {
    return <></>;
  }
  return (
    <UserProvider id={id}>
      <Page unpadded>
        <Header />
        <UserDemoList />
      </Page>
    </UserProvider>
  );
});

export default Demos;
