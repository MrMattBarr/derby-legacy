import { LineProvider } from "contexts/LineContext";
import useRole from "contexts/RoleContext";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import LineLine from "./Lines/LineLine";

const RoleLines = observer(() => {
  const { role } = useRole();
  return (
    <View>
      {role?.lines.map((id, index) => (
        <LineProvider id={id} key={id} index={index}>
          <LineLine />
        </LineProvider>
      ))}
    </View>
  );
});

export default RoleLines;
