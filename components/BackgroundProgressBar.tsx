import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export default function BackgroundProgressBar({
  progress,
}: {
  progress?: number;
}) {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: 0,
    },
  });
  const width = `${(progress ?? 0) * 100}%`;
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: Colors[colorScheme].Player.progress,
        position: "absolute",
        top: 0,
        height: "100%",
        width,
      }}
    ></View>
  );
}
