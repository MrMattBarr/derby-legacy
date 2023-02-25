import { useLinkTo } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import useClient from "../contexts/ClientContext";
import useTextBar from "../contexts/TextBarContext";
import { useColors } from "../hooks/useColorScheme";
import { useAuth } from "../stores/AuthStore";
import { Sizes } from "../styles/sizes";
import TextButton from "./Buttons/TextButton";
import { View } from "./Themed";

const PhoneBottomSpacer = observer(() => {
  const textBar = useTextBar();
  const linkTo = useLinkTo();
  const colors = useColors();
  const { isMobile } = useClient();
  const authStore = useAuth();
  const uid = authStore.user?.uid;
  const loggedOut = !uid || authStore.user?.isAnonymous;

  if (!isMobile || loggedOut) {
    return <></>;
  }

  const styles = StyleSheet.create({
    clear: {
      backgroundColor: "transparent",
      display: "flex",
      flexGrow: 1,
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    spacer: {
      paddingBottom: 35,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
      borderColor: colors.Borders.default,
      borderTopWidth: textBar.args ? 0 : 1,
      zIndex: 3,
      height: Sizes.PHONE_BOTTOM_NAV,
      backgroundColor: colors.Backgrounds.secondary,
      width: "100%",
    },
  });
  return (
    <View style={styles.spacer}>
      <View style={styles.clear}>
        <TextButton
          onPress={() => {
            linkTo("/home");
          }}
          label="Home"
        />
        <TextButton
          onPress={() => {
            linkTo("/demos");
          }}
          label="Demos"
        />
        <TextButton
          onPress={() => {
            linkTo("/spots");
          }}
          label="Spots"
        />
      </View>
    </View>
  );
});

export default PhoneBottomSpacer;
