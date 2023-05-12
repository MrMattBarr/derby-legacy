import { observer } from "mobx-react";
import React from "react";
import { DemoProvider } from "../../contexts/DemoContext";
import useUser from "../../contexts/UserContext";
import { useColors } from "../../hooks/useColorScheme";
import DemoLine from "../DemoLine";
import { View } from "../Themed";
import { generateStyles } from "./styles";

const UserDemoList = observer(() => {
  const { user } = useUser();
  const colors = useColors();
  const { section } = generateStyles(colors);

  if (!user) {
    return <></>;
  }
  const demoIds = Object.keys(user?.demos);
  return (
    <View style={section}>
      {demoIds.map((id) => {
        return (
          <DemoProvider key={id} id={id}>
            <DemoLine />
          </DemoProvider>
        );
      })}
    </View>
  );
});

export default UserDemoList;
