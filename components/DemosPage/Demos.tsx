import { toJS } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Colors from "../../constants/Colors";
import { useDemos } from "../../stores/DemosStore";
import useColorScheme from "../../hooks/useColorScheme";
import { mainStyles } from "../../listStyles";
import DemoLine from "../DemoLine";
import Header from "./Header";
import { UserProvider } from "../../contexts/UserContext";
import { ParameterPage } from "../../types/ParameterPage";
import { useAuth } from "../../stores/AuthStore";
import UserDemoList from "./UserDemoList";
import { generatePageStyles } from "../../styles/page";
import Page from "../Page";

const Demos = observer(({ route }: ParameterPage) => {
  const demos = useDemos();
  const demoIds = toJS(demos.demoIds);
  const authStore = useAuth();
  const id = route?.params?.id ?? authStore.user?.uid;
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const styles = generatePageStyles(colors);
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
