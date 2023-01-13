import { useLinkTo } from "@react-navigation/native";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import useClient from "../contexts/ClientContext";
import { useColors } from "../hooks/useColorScheme";
import { useModal } from "../contexts/ModalContext";
import { Sizes } from "../styles/sizes";
import textStyles from "../styles/text";
import TextButton from "./Buttons/TextButton";
import Nothing from "./Nothing";
import { View } from "./Themed";

const PhoneBottomSpacer = () => {
  const linkTo = useLinkTo();
  const colors = useColors();
  const { isMobile } = useClient();

  if (!isMobile) {
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
      padding: 20,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
      borderColor: colors.Borders.default,
      borderTopWidth: 1,
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
      </View>
    </View>
  );
};

export default PhoneBottomSpacer;
