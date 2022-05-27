import { observer } from "mobx-react";
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import AppLoading from "expo-app-loading";

import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Kalam_400Regular } from "@expo-google-fonts/kalam";
import PlayButton from "../PlayButton";
import { useColors } from "../../hooks/useColorScheme";

interface ITape {
  id: string;
}
const Tape = observer(({ id }: ITape) => {
  const SCREW_SIZE = 20;
  const totalReelSize = 175;
  const gearPadding = 10;
  const innerGearSize = 30;
  const leftReelSize = 100;
  let leftReelOffset = (leftReelSize - innerGearSize) / 2 - gearPadding;
  const rightReelSize = totalReelSize - leftReelSize;
  let rightReelOffset = (rightReelSize - innerGearSize) / 2 - gearPadding;

  const colors = useColors();

  const [fontsLoaded] = useFonts({
    Kalam: require("/assets/fonts/Kalam-Regular.ttf"),
  });
  const s = StyleSheet.create({
    tape: {
      borderWidth: 2,
      borderColor: "black",
      position: "relative",
      backgroundColor: "#3f79b3",
      maxWidth: 500,
      aspectRatio: 1.6,
      borderRadius: 10,
      minWidth: 400,
      minHeight: 250,
      display: "flex",
      flexDirection: "column",
      padding: 20,
    },
    screw: {
      position: "absolute",
      borderColor: "black",
      borderWidth: 1,
      borderRadius: SCREW_SIZE,
      zIndex: 2,
      width: SCREW_SIZE,
      height: SCREW_SIZE,
      paddingBottom: 3,
      paddingLeft: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "silver",
    },
    screwText: {
      fontWeight: "bold",
      color: "black",
    },
    screwTR: {
      top: 3,
      right: 3,
    },
    screwTL: {
      top: 3,
      left: 3,
    },
    screwBL: {
      bottom: 3,
      left: 3,
    },
    screwBR: {
      bottom: 3,
      right: 3,
    },
    label: {
      position: "relative",
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 10,
      aspectRatio: 2.25,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    gears: {
      position: "absolute",
      borderColor: "black",
      borderWidth: 1,
      backgroundColor: colors.tintedBrandBackground,
      borderRadius: 300,
      top: "40%",
      width: "66%",
      overflow: "hidden",
      flexDirection: "row",
      display: "flex",
      justifyContent: "space-between",
    },
    leftReel: {
      position: "absolute",
      width: leftReelSize,
      height: leftReelSize,
      borderRadius: leftReelSize,
      borderWidth: 1,
      borderColor: "black",
      left: -leftReelOffset,
      top: -leftReelOffset,
      backgroundColor: colors.accentBG,
    },
    rightReel: {
      position: "absolute",
      width: rightReelSize,
      height: rightReelSize,
      borderRadius: rightReelSize,
      borderWidth: 1,
      borderColor: "black",
      right: -rightReelOffset,
      top: -rightReelOffset,
      backgroundColor: colors.accentBG,
    },
    gear: {
      borderColor: "black",
      borderWidth: 1,
      backgroundColor: "#ddd",
      height: innerGearSize,
      width: innerGearSize,
      borderRadius: innerGearSize,
      margin: gearPadding,
    },
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
    bgTexture: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      flexGrow: 1,
    },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const image = {
    uri: "https://www.transparenttextures.com/patterns/skulls.png",
  };

  return (
    <View style={s.tape}>
      <ImageBackground source={image} resizeMode="repeat" style={s.bgTexture} />
      <View style={[s.screw, s.screwTL]}>
        <Text style={s.screwText}>+</Text>
      </View>
      <View style={[s.screw, s.screwTR]}>
        <Text style={s.screwText}>+</Text>
      </View>
      <View style={[s.screw, s.screwBL]}>
        <Text style={s.screwText}>+</Text>
      </View>
      <View style={[s.screw, s.screwBR]}>
        <Text style={s.screwText}>+</Text>
      </View>
      <LinearGradient colors={["#fb7ba2", "#fce043"]} style={s.label}>
        <View style={s.demoNameLabel}>
          <Text style={s.demoNameText}>Announcer Demo</Text>
        </View>
        <View style={s.gears}>
          <View style={s.leftReel} />
          <View style={s.rightReel} />
          <View style={s.gear}></View>
          <View style={s.gear}></View>
        </View>
      </LinearGradient>
    </View>
  );
});

export default Tape;
