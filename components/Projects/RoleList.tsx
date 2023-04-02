import useUser from "contexts/UserContext";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import { TEST_ROLES } from "testData/role";
import RoleLine from "./RoleLine";
import { RoleProvider } from "contexts/RoleContext";

const RoleList = observer(() => {
  const user = useUser();
  const roleIds = Object.keys(user.user.roles);
  console.log({ roleIds });
  return (
    <View>
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
