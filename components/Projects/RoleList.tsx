import { RoleProvider } from "contexts/RoleContext";
import useUser from "contexts/UserContext";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import RoleLine from "./RoleLine";
import SubHeader from "./Subheader";

const RoleList = observer(() => {
  const user = useUser();
  const roleIds = Object.keys(user?.user?.roles ?? {}) ?? [];
  const projectIds = Object.keys(user?.user?.projects ?? {}) ?? [];
  const needsSubHeader = roleIds.length > 0 && projectIds.length > 0;
  return (
    <View>
      {needsSubHeader && <SubHeader label="My Roles" />}
      {roleIds.map((id) => {
        return (
          <RoleProvider key={id} id={id}>
            <RoleLine />
          </RoleProvider>
        );
      })}
    </View>
  );
});

export default RoleList;
