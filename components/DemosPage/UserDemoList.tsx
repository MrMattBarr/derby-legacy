import { observer } from "mobx-react";
import React from "react";
import { FlatList } from "react-native";
import { DemoProvider } from "../../contexts/DemoContext";
import useUser from "../../contexts/UserContext";
import { useColors } from "../../hooks/useColorScheme";
import main from "../../styles/main";
import DemoLine from "../DemoLine";

const UserDemoList = observer(() => {
  const { user } = useUser();
  const colors = useColors();
  const { list } = main(colors);
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
