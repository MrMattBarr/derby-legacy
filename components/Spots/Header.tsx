import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import Colors from "../../constants/Colors";
import useClient from "../../contexts/ClientContext";
import { ModalKey, useModal } from "../../contexts/ModalContext";
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
  const { setModal } = useModal();
  const { isMobile } = useClient();
  const colors = Colors[colorScheme];
  const text = textStyles(colors);

  const openModal = () => {
    setModal(ModalKey.RECORDING);
  };
  const { user } = useUser();
  const { header, pageName, pageNameAndIcon } = generateStyles(colors, {
    isMobile,
  });
  return (
    <View style={header}>
      <View style={pageNameAndIcon}>
        <Avatar />
        <View style={pageName}>
          <Text style={text.h1}>{user?.profile?.displayName}</Text>
          <Text style={text.text}>Spots</Text>
        </View>
      </View>
      <View>
        <BigButton onPress={openModal} icon="microphone" label="Record" />
      </View>
    </View>
  );
});

export default Header;
