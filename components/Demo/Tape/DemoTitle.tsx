import { useFonts } from "@expo-google-fonts/kalam";
import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import useDemo from "../../../contexts/DemoContext";
import usePlayback from "../../../contexts/PlaybackContext";
import { useColors } from "../../../hooks/useColorScheme";
import { Text, View } from "../../Themed";

const DemoTitle = observer(() => {
  const { demo } = useDemo();
  const colors = useColors();
  const { active } = usePlayback();
  const focused = demo?.id === active?.demo;

  const [fontsLoaded] = useFonts({
    Kalam: require("/assets/fonts/Kalam-Regular.ttf"),
  });

  const s = StyleSheet.create({
    demoNameLabel: {
      backgroundColor: focused ? colors.Backgrounds.playback : "#eeed",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      flexGrow: 1,
      alignItems: "center",
      borderRadius: 4,
    },
    demoNameText: {
      color: focused ? colors.Text.default : colors.Text.contrast,
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
