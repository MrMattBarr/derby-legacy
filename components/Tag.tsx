import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export default function Tag({ children }: any) {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    tag: {
      borderWidth: 1,
      overflow: "hidden",
      backgroundColor: Colors[colorScheme].tag,
      borderRadius: 4,
      borderColor: Colors[colorScheme].hardBorder,
      paddingHorizontal: 10,
      paddingVertical: 3,
      marginRight: 5,
      fontSize: 12,
    },
  });
  return <Text style={styles.tag}>{children}</Text>;
}
