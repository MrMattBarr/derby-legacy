import Loading from "components/Demo/Loading";

import Avatar from "components/Avatar";
import AppText from "components/Controls/Text";
import useRole from "contexts/RoleContext";
import useUser, { UserProvider } from "contexts/UserContext";
import { useColors } from "hooks/useColorScheme";
import React from "react";
import { Pressable, View } from "react-native";
import { Sizes } from "styles/sizes";
import { generateStyles } from "./styles";
import { observer } from "mobx-react";
import { NavPage } from "constants/Navigation";
import useAppNav from "contexts/NavigationContext";
import { ApprovalStatus } from "types/Take";

const InnerSummary = () => {
  const { role, lines } = useRole();
  const { user } = useUser();
  const colors = useColors();
  const { go } = useAppNav();
  const { roleLine } = generateStyles(colors);
  const lineWord = role?.lines.length === 1 ? "line" : "lines";

  if (!role || !user) {
    return <Loading />;
  }
  const goToRole = () => {
    go(NavPage.ROLE, { id: role.id });
  };

  const finishedLineCount = lines.filter(
    (line) => line?.status === ApprovalStatus.APPROVED
  ).length;

  return (
    <Pressable style={roleLine} onPress={goToRole}>
      <Avatar style={{ marginRight: Sizes.Spacings.STANDARD }} size={55} />
      <View>
        <AppText header>{role.name}</AppText>
        <AppText>{user?.profile?.displayName ?? "Loading"}</AppText>
        <AppText
          style={{ color: colors.Text.subtle }}
        >{`${finishedLineCount} / ${lines.length ?? 0} ${lineWord}`}</AppText>
      </View>
    </Pressable>
  );
};

const CastRoleSummary = observer(({ talent }: { talent: string }) => {
  if (!talent) {
    return <Loading />;
  }

  return (
    <UserProvider id={talent}>
      <InnerSummary />
    </UserProvider>
  );
});

export default CastRoleSummary;
