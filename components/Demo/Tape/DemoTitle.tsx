import { useFonts } from "@expo-google-fonts/kalam";
import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import { AppColor } from "../../../constants/Colors";
import useDemo from "../../../contexts/DemoContext";
import usePlayback from "../../../contexts/PlaybackContext";
import { useColors } from "../../../hooks/useColorScheme";
import { Text, View } from "../../Themed";

interface IDemoTitle {
  unitSize?: number;
}

const DemoTitle = observer(({ unitSize }: IDemoTitle) => {
  const { demo } = useDemo();
  const colors = useColors();
  const size = unitSize ?? 2;

  const [fontsLoaded] = useFonts({
    Kalam: require("/assets/fonts/Kalam-Regular.ttf"),
  });

  const s = StyleSheet.create({
    demoNameLabel: {
      backgroundColor: colors.Backgrounds.label,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      flexGrow: 1,
      alignItems: "center",
      borderRadius: size * 2,
    },
    demoNameText: {
      color: colors.Text.contrast,
      fontSize: size * 15,
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
