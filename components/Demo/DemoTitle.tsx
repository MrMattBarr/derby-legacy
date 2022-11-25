import { useFonts } from "@expo-google-fonts/kalam";
import AppLoading from "expo-app-loading";
import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import useDemo from "../../contexts/DemoContext";
import { Text, View } from "../Themed";

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
      alignItems: "center",
      position: "absolute",
      top: 10,
      borderRadius: 4,
      width: "90%",
      color: "black",
    },
    demoNameText: {
      color: "black",
      fontSize: 30,
      fontFamily: "Kalam",
    },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={s.demoNameLabel}>
      <Text style={s.demoNameText}>{demo?.title}</Text>
    </View>
  );
});

export default DemoTitle;