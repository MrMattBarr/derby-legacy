import { Link, useLinkTo } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { Pressable, View } from "react-native";
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
  const text = textStyles(colors);
  const linkTo = useLinkTo();

  const { user, isSelf } = useUser();
  const navigate = () => {
    const destination = `/profile/${user?.id}`;
    linkTo(destination);
  };

  const headerText = isSelf ? "Demos" : user?.profile?.displayName;
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
          {!isSelf && <Text style={text.text}>Demos</Text>}
        </View>
      </Pressable>
      <View>
        <BigButton link="/demos/new" icon="plus" label="New Demo" />
      </View>
    </View>
  );
});

export default Header;
