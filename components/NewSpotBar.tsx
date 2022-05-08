import React from "react";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import useColorScheme from "../hooks/useColorScheme";
import LogoutButton from "./LogoutButton";
import PhoneBottomSpacer from "./PhoneBottomSpacer";
import UploadSpotButton from "./UploadSpotButton";

export default function NewSpotBar() {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      padding: 20,
    },
  });
  return (
    <>
      <View style={styles.container}>
        <LogoutButton />
        <UploadSpotButton />
      </View>
      <PhoneBottomSpacer />
    </>
  );
}
