import { useLinkTo } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { Pressable, View } from "react-native";
import Colors from "../../constants/Colors";
import useClient from "../../contexts/ClientContext";
import { ModalKey, useModal } from "../../contexts/ModalContext";
import useUser from "../../contexts/UserContext";
import useColorScheme from "../../hooks/useColorScheme";
import textStyles from "../../styles/text";
import Avatar from "../Avatar";
import BigButton from "../Buttons/BigButton";
import { Text } from "../Themed";
import { generateStyles } from "./styles";

const Header = observer(() => {
  const colorScheme = useColorScheme();
  const { setModal } = useModal();
  const { isMobile } = useClient();

  const linkTo = useLinkTo();
  const colors = Colors[colorScheme];
  const text = textStyles(colors);

  const { user, isSelf } = useUser();
  const headerText = isSelf ? "Spots" : user?.profile?.displayName;
  const navigate = () => {
    const destination = `/profile/${user?.id}`;
    linkTo(destination);
  };

  const openModal = () => {
    setModal(ModalKey.RECORDING);
  };
  const { header, pageName, pageNameAndIcon } = generateStyles(colors, {
    isMobile,
  });
  return (
    <View style={header}>
      <Pressable onPress={navigate} style={pageNameAndIcon}>
        <Avatar />
        <View style={pageName}>
          <Text style={text.h1}>{headerText}</Text>
          {!isSelf && <Text style={text.text}>Spots</Text>}
        </View>
      </Pressable>
      {isSelf && (
        <View>
          <BigButton onPress={openModal} icon="microphone" label="Record" />
        </View>
      )}
    </View>
  );
});

export default Header;
