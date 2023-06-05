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
import { ApprovalStatus } from "types/Take";
import useProject from "contexts/ProjectContext";

const Header = observer(() => {
  const colors = useColors();
  const authStore = useAuth();
  const { project } = useProject();

  const { header, content } = generateStyles(colors);

  return (
    <View style={header}>
      <View style={content}>
        <View>
          <AppText header>{project?.title}</AppText>
        </View>
      </View>
    </View>
  );
});

export default Header;
