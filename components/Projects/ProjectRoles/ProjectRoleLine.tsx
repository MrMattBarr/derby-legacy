import AppText from "components/Controls/Text";
import Loading from "components/Demo/Loading";

import { View } from "components/Themed";
import useRole, { RoleProvider } from "contexts/RoleContext";
import { useColors } from "hooks/useColorScheme";
import React from "react";
import { generateStyles } from "./styles";
import { UserProvider } from "contexts/UserContext";
import Avatar from "components/Avatar";
import { ro } from "date-fns/locale";
import { Sizes } from "styles/sizes";
import CastRoleSummary from "./CastRoleSummary";
import { Pressable } from "react-native";

const ProjectRoleSummary = () => {
  const { role } = useRole();

  const colors = useColors();
  const { roleLine, uncastAvatar } = generateStyles(colors);
  const lineWord = role?.lines.length === 1 ? "line" : "lines";
  if (!role) {
    return <Loading />;
  }
  if (role.talent) {
    return <CastRoleSummary talent={role.talent} />;
  }

  return (
    <Pressable style={roleLine}>
      <View style={uncastAvatar}></View>
      <View>
        <AppText header>{role.name}</AppText>
        <AppText style={{ color: colors.Text.subtle }}>{`${
          role.lines.length ?? 0
        } ${lineWord}`}</AppText>
      </View>
    </Pressable>
  );
};

const ProjectRoleLine = ({ id }: { id: string }) => {
  if (!id) {
    return <Loading />;
  }

  return (
    <RoleProvider id={id}>
      <ProjectRoleSummary />
    </RoleProvider>
  );
};

export default ProjectRoleLine;
