import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "../components/Themed";
import Colors from "../constants/Colors";
import useDemo from "../contexts/DemoContext";
import useColorScheme from "../hooks/useColorScheme";
import { toJS } from "mobx";

export default function SaveButton() {
  const colorScheme = useColorScheme();
  const { spotIds } = useDemo();
  const { saveDemo } = useDemo();
  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: Colors[colorScheme].text,
      borderRadius: 4,
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      alignSelf: "flex-end",
      marginTop: 10,
      padding: 10,
      backgroundColor: Colors[colorScheme].contrastBand,
    },
    text: {
      fontWeight: "bold",
      fontSize: 18,
      color: Colors[colorScheme].text,
    },
  });
  if (toJS(spotIds).length === 0) {
    return <></>;
  }
  return (
    <Pressable onPress={saveDemo} style={styles.container}>
      <Text style={styles.text}>Save Demo</Text>
    </Pressable>
  );
}
