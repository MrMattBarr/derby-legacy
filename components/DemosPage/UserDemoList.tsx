import { observer } from "mobx-react";
import React from "react";
import { FlatList } from "react-native";
import { DemoProvider } from "../../contexts/DemoContext";
import useUser from "../../contexts/UserContext";
import { useColors } from "../../hooks/useColorScheme";
import DemoLine from "../DemoLine";
import { generateStyles } from "./styles";

const UserDemoList = observer(() => {
  const { user } = useUser();
  const colors = useColors();
  const { list } = generateStyles(colors);
  if (!user) {
    return <></>;
  }
  const demoIds = Object.keys(user?.demos);
  return (
    <FlatList
      data={[...demoIds]}
      style={list}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <DemoProvider id={item}>
          <DemoLine />
        </DemoProvider>
      )}
    />
  );
});

export default UserDemoList;
