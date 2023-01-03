import { useFonts } from "@expo-google-fonts/kalam";
import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import useDemo from "../../../contexts/DemoContext";
import { Text, View } from "../../Themed";

const DemoTitle = observer(() => {
  const { demo } = useDemo();

  const [fontsLoaded] = useFonts({
    Kalam: require("/assets/fonts/Kalam-Regular.ttf"),
  });

  const s = StyleSheet.create({
    demoNameLabel: {
      backgroundColor: "#eeed",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      flexGrow: 1,
      alignItems: "center",
      borderRadius: 4,
      color: "black",
    },
    demoNameText: {
      color: "black",
      fontSize: 30,
      fontFamily: "Kalam",
    },
  });

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <View style={s.demoNameLabel}>
      <Text style={s.demoNameText}>{demo?.title}</Text>
    </View>
  );
});

export default DemoTitle;
