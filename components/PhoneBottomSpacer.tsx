import React from "react";
import { Platform, StyleSheet, useColorScheme } from "react-native";
import { View } from "./Themed";

export default function PhoneBottomSpacer() {
  const colorScheme = useColorScheme() || "dark";

  const styles = StyleSheet.create({
    spacer: {
      ...Platform.select({
        native: {
          paddingBottom: 20,
        },
      }),
      // backgroundColor: "#7d011e",
    },
  });

  return <View style={styles.spacer} />;
}
