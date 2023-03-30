import Page from "components/Page";
import useRole, { RoleProvider } from "contexts/RoleContext";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import { ParameterPage } from "types/ParameterPage";
import Header from "./Header";
import LineLine from "./Lines/LineLine";
import ProjectSummary from "./ProjectSummary";

const RoleLines = observer(() => {
  const { role } = useRole();
  return (
    <View>
      {role?.lines.map((id) => (
        <LineLine id={id} key={id} />
      ))}
    </View>
  );
});

export default RoleLines;
