import { useFonts } from "@expo-google-fonts/kalam";
import AppLoading from "expo-app-loading";
import { LinearGradient } from "expo-linear-gradient";
import { runInAction, toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useContext, useEffect, useState } from "react";
import { Animated, Easing, ImageBackground, StyleSheet } from "react-native";
import useDemos, { DemosTestContext } from "../../contexts/DemosContext";
import usePlayback, { PlayState } from "../../contexts/PlaybackContext";
import { useColors } from "../../hooks/useColorScheme";
import PlayButton from "../PlayButton";
import { Text, View } from "../Themed";

interface ITape {
  id: string;
}
const Tape = observer(({ id }: ITape) => {
  const { active } = usePlayback();
  const jsActive = toJS(active);

  let progress = 0;
  if (jsActive.playbackStatus?.isLoaded) {
    progress =
      jsActive?.playbackStatus?.positionMillis /
      jsActive.playbackStatus.durationMillis!;
  }

  let remainingProgress = 1 - progress;

  const totalReelSize = 200;
  const minDialSize = 50;
  const playableReelSize = totalReelSize - 2 * minDialSize;

  const SCREW_SIZE = 20;
  const gearPadding = 10;
  const innerGearSize = 30;
  const lReelSize = minDialSize + remainingProgress * playableReelSize;
  let lReelOffset = (lReelSize - innerGearSize) / 2 - gearPadding;
  const rReelSize = totalReelSize - lReelSize;
  const rReelOffset = (rReelSize - innerGearSize) / 2 - gearPadding;
  const lMotionBlurSize = lReelSize - 35;
  const rMotionBlurSize = rReelSize - 10;
  const [spin, setSpin] = useState<Animated.AnimatedInterpolation | undefined>(
    undefined
  );

  let spinValue = new Animated.Value(0);

  const calculateSpin = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear, // Easing is an additional import from react-native
        useNativeDriver: false, // To make use of native driver for performance
      })
    ).start(() => {});

    // Next, interpolate beginning and end values (in this case 0 and 1)
    return spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "-360deg"],
    });
  };

  const demos = useDemos();
  useEffect(() => {
    demos.loadDemo(id);
  }, [demos]);

  const playDemo = () => {
    const nextStatus =
      active.status === PlayState.PLAYING
        ? PlayState.PAUSED
        : PlayState.PLAYING;
    runInAction(() => {
      active.demo = id;
      active.status = nextStatus;
    });
    setSpin(calculateSpin());
  };

  const demo = demos.demos[id];

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
    reel: {
      position: "absolute",
      borderWidth: 1,
      borderColor: "black",
      backgroundColor: colors.accentBG,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transform: [{ rotate: spin }],
    },
    lReel: {
      width: lReelSize,
      height: lReelSize,
      left: -lReelOffset,
      top: -lReelOffset,
      borderRadius: lReelSize,
    },
    lMotionBlur: {
      backgroundColor: "transparent",
      borderColor: "#837b6f55",
      borderRightWidth: 3,
      borderLeftWidth: 1,
      borderTopWidth: 0,
      borderBottomWidth: 0,
      borderRadius: lMotionBlurSize,
      width: lMotionBlurSize,
      height: lMotionBlurSize,
    },
    rMotionBlur: {
      backgroundColor: "transparent",
      borderColor: "#837b6f55",
      borderRightWidth: 3,
      borderLeftWidth: 1,
      borderTopWidth: 0,
      borderBottomWidth: 0,
      width: rMotionBlurSize,
      borderRadius: rMotionBlurSize,
      height: rMotionBlurSize,
    },
    rReel: {
      width: rReelSize,
      height: rReelSize,
      borderRadius: rReelSize,
      right: -rReelOffset,
      top: -rReelOffset,
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
    controls: {
      display: "flex",
      padding: 10,
      justifyContent: "center",
      flexDirection: "row",
      backgroundColor: "transparent",
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
          <Text style={s.demoNameText}>{demo?.title}</Text>
        </View>
        <View style={s.gears}>
          <Animated.View style={[s.lReel, s.reel]}>
            <View style={[s.lMotionBlur]} />
          </Animated.View>
          <Animated.View style={[s.rReel, s.reel]}>
            <View style={[s.rMotionBlur]} />
          </Animated.View>
          <View style={s.gear}></View>
          <View style={s.gear}></View>
        </View>
      </LinearGradient>
      <View style={s.controls}>
        <PlayButton
          onToggle={playDemo}
          playing={active.status == PlayState.PLAYING}
        />
      </View>
    </View>
  );
});

export default Tape;
