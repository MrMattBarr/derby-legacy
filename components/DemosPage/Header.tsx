import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import Colors from "../../constants/Colors";
import useClient from "../../contexts/ClientContext";
import useUser from "../../contexts/UserContext";
import useColorScheme from "../../hooks/useColorScheme";
import { generatePageStyles } from "../../styles/page";
import textStyles from "../../styles/text";
import Avatar from "../Avatar";
import BigButton from "../Buttons/BigButton";
import { Text } from "../Themed";
import { generateStyles } from "./styles";

const Header = observer(() => {
  const colorScheme = useColorScheme();
  const { isMobile } = useClient();
  const colors = Colors[colorScheme];
  const pageStyles = generatePageStyles(colors);
  const text = textStyles(colors);

  const { user } = useUser();
  const { header, pageName, pageNameAndIcon } = generateStyles(colors, {
    isMobile,
  });
  return (
    <View style={{ ...pageStyles.section, ...header }}>
      <View style={pageNameAndIcon}>
        <Avatar />
        <View style={pageName}>
          <Text style={text.h1}>{user?.profile?.displayName}</Text>
          <Text style={text.text}>Demos</Text>
        </View>
      </View>
      <View>
        <BigButton link="/demos/new" icon="plus" label="Create New" />
      </View>
    </View>
  );
});

export default Header;
