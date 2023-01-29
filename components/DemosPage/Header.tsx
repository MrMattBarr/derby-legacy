import { Link } from "@react-navigation/native";
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

  const { user } = useUser();
  const destination = `/profile/${user?.id}`;
  const { header, pageName, pageNameAndIcon } = generateStyles(colors, {
    isMobile,
  });
  console.log({ destination });
  if (!user?.id) {
    return <></>;
  }
  return (
    <View style={header}>
      <Link to={destination} style={pageNameAndIcon}>
        <Avatar />
        <View style={pageName}>
          <Text style={text.h1}>{user?.profile?.displayName}</Text>
          <Text style={text.text}>Demos</Text>
        </View>
      </Link>
      <View>
        <BigButton link="/demos/new" icon="plus" label="Create New" />
      </View>
    </View>
  );
});

export default Header;
