import Avatar from "components/Avatar";
import useClient from "contexts/ClientContext";
import useRole from "contexts/RoleContext";
import useUser, { UserProvider } from "contexts/UserContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React from "react";
import { Text, View } from "react-native";
import { useAuth } from "stores/AuthStore";
import textStyles from "styles/text";
import { generateStyles } from "./styles";
import { Sizes } from "styles/sizes";
import AppText from "components/Controls/Text";
import Loading from "components/Demo/Loading";
import ProgressBar from "components/ProgressBar";

const WrappedHeader = observer(() => {
  const colors = useColors();
  const authStore = useAuth();
  const { role } = useRole();
  const talent = useUser();
  const isSelf = talent.user.id === authStore.user?.uid;
  const { isMobile } = useClient();
  const text = textStyles(colors);
  const { header, barHolder, content } = generateStyles(colors, {
    isMobile,
  });
  const lineWord = role?.lines.length === 1 ? "line" : "lines";
  return (
    <View style={header}>
      {!isSelf && (
        <Avatar size={75} style={{ marginRight: Sizes.Spacings.STANDARD }} />
      )}
      <View style={content}>
        <View>
          <AppText header>{role?.name}</AppText>
          {!isSelf && <AppText>{talent.user.profile?.displayName}</AppText>}
        </View>
        <Text style={text.text}>
          0 / {role?.lines.length} {lineWord} complete
        </Text>
        <View style={barHolder}>
          <ProgressBar />
        </View>
      </View>
    </View>
  );
});

const Header = () => {
  const { role } = useRole();
  if (!role?.talent) {
    return <Loading />;
  }

  return (
    <UserProvider id={role?.talent}>
      <WrappedHeader />
    </UserProvider>
  );
};

export default Header;
