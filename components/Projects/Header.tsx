import { useLinkTo } from "@react-navigation/native";
import Avatar from "components/Avatar";
import useClient from "contexts/ClientContext";
import useUser from "contexts/UserContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React from "react";
import { Pressable, Text, View } from "react-native";
import textStyles from "styles/text";
import { generateStyles } from "./styles";
import BigButton from "components/Buttons/BigButton";
import IconButton from "components/IconButton";

const Header = observer(() => {
  const colors = useColors();
  const { isMobile } = useClient();
  const text = textStyles(colors);
  const linkTo = useLinkTo();

  const { user, isSelf } = useUser();
  const navigate = () => {
    const destination = `/profile/${user?.id}`;
    linkTo(destination);
  };

  const newProject = () => {
    linkTo("/projects/new");
  };

  const headerText = isSelf ? "Projects" : user?.profile?.displayName;
  const { header, pageName, pageNameAndIcon } = generateStyles(colors, {
    isMobile,
  });
  if (!user?.id) {
    return <></>;
  }
  return (
    <View style={header}>
      <Pressable onPress={navigate} style={pageNameAndIcon}>
        <Avatar />
        <View style={pageName}>
          <Text style={text.h1}>{headerText}</Text>
          {!isSelf && <Text style={text.text}>Projects</Text>}
        </View>
      </Pressable>

      <View>
        <IconButton
          background={colors.Backgrounds.primary}
          onPress={newProject}
          icon="plus"
        />
      </View>
    </View>
  );
});

export default Header;
