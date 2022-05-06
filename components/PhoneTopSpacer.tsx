import React from "react";
import { Platform, StyleSheet, useColorScheme } from "react-native";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";

export default function PhoneTopSpacer({ children }: any) {
  const colorScheme = useColorScheme() || "dark";

  const styles = StyleSheet.create({
    spacer: {
      ...Platform.select({
        native: {
          paddingTop: 40,
        },
      }),
      backgroundColor: Colors[colorScheme].accentBG,
    },
  });

  return <View style={styles.spacer}>{children}</View>;
}
