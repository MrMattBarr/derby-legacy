import useUser from "contexts/UserContext";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import ProjectLine from "./ProjectLine";

const ProejctList = observer(() => {
  const user = useUser();
  const projectIds = Object.keys(user?.user?.projects ?? {}) ?? [];
  return (
    <View>
      {projectIds.map((id) => {
        return <ProjectLine id={id} key={id} />;
      })}
    </View>
  );
});

export default ProejctList;
