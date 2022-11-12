import React from "react";
import { Platform, StyleSheet, useColorScheme } from "react-native";
import Colors from "../constants/Colors";
import { Text, View } from "./Themed";

export default function PhoneBottomSpacer() {
  const colorScheme = useColorScheme() || "dark";

  const styles = StyleSheet.create({
    clear: {
      backgroundColor: "transparent",
    },
    spacer: {
      ...Platform.select({
        native: {
          paddingBottom: 20,
          height: 100,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          borderColor: "#bcac8b",
          borderTopWidth: 1,
          backgroundColor: Colors[colorScheme].accentBG,
          width: "100%",
        },
      }),
    },
  });

  return (
    <View style={styles.spacer}>
      <View style={styles.clear}>
        <Text>Navigation</Text>
      </View>
    </View>
  );
}
