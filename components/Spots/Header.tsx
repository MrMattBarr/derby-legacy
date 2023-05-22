import { useLinkTo } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { Pressable, View, useColorScheme } from "react-native";
import { generateStyles } from "./styles";
import Avatar from "components/Avatar";
import BigButton from "components/Buttons/BigButton";
import { ModalKey } from "config/ModalKeys";
import useClient from "contexts/ClientContext";
import { useModal } from "contexts/ModalContext";
import useUser from "contexts/UserContext";
import { Colors } from "react-native/Libraries/NewAppScreen";
import textStyles from "styles/text";
import AppText from "components/Controls/Text";
import { useColors } from "hooks/useColorScheme";

const Header = observer(() => {
  const { setModal } = useModal();
  const { isMobile } = useClient();

  const linkTo = useLinkTo();
  const colors = useColors();

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
          <AppText header>{headerText}</AppText>
          {!isSelf && <AppText>Spots</AppText>}
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
