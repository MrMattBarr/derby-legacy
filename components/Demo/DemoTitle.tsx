import { useFonts } from "@expo-google-fonts/kalam";
import AppLoading from "expo-app-loading";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import useDemos from "../../contexts/DemosContext";
import { Text, View } from "../Themed";

interface ITape {
  id: string;
}
const DemoTitle = observer(({ id }: ITape) => {
  const demos = useDemos();
  useEffect(() => {
    demos.loadDemo(id);
  }, [demos]);

  const demo = demos.demos[id];

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
