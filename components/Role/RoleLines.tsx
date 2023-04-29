import { LineProvider } from "contexts/LineContext";
import useRole from "contexts/RoleContext";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import LineLine from "./Lines/LineLine";
import SubHeader from "../Projects/Subheader";

const RoleLines = observer(() => {
  const { role } = useRole();
  return (
    <View>
      {role?.lines.map((id) => (
        <LineProvider id={id} key={id}>
          <LineLine />
        </LineProvider>
      ))}
    </View>
  );
});

export default RoleLines;
