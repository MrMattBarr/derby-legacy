import { Entypo } from "@expo/vector-icons";
import { useLinkTo } from "@react-navigation/native";
import { NavPage } from "constants/Navigation";
import useClient from "contexts/ClientContext";
import useAppNav from "contexts/NavigationContext";
import useTextBar from "contexts/TextBarContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useAuth } from "stores/AuthStore";
import NavButton from "./NavButton";
import { generateStyles } from "./styles";

const PhoneNav = observer(() => {
  const textBar = useTextBar();
  const colors = useColors();
  const { isMobile } = useClient();
  const linkTo = useLinkTo();
  const { go } = useAppNav();
  const authStore = useAuth();
  const uid = authStore.user?.uid;
  const loggedOut = !uid || authStore.user?.isAnonymous;

  if (!isMobile || loggedOut) {
    return <></>;
  }

  const styles = generateStyles(colors, { hasTextBar: !!textBar?.args });
  return (
    <View style={styles.spacer}>
      <View style={styles.clear}>
        <NavButton destination={NavPage.PROFILE} args={{ id: uid }} />
        <NavButton destination={NavPage.DEMOS} args={{ id: uid }} />
        <NavButton destination={NavPage.PROJECTS} args={{ id: uid }} />
      </View>
    </View>
  );
});

export default PhoneNav;
