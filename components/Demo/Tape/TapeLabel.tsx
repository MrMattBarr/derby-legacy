import { LinearGradient } from "expo-linear-gradient";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { AppColor } from "../../../constants/Colors";
import usePlayback from "../../../contexts/PlaybackContext";
import { useColors } from "../../../hooks/useColorScheme";
import { View } from "../../Themed";
import UserSummary from "../UserSummary";
import FrontTitle from "./FrontTitle";

const TapeLabel = observer(() => {
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

  const gearPadding = 10;
  const innerGearSize = 30;
  const lReelSize = minDialSize + remainingProgress * playableReelSize;
  let lReelOffset = (lReelSize - innerGearSize) / 2 - gearPadding;
  const rReelSize = totalReelSize - lReelSize;
  const rReelOffset = (rReelSize - innerGearSize) / 2 - gearPadding;
  const lMotionBlurSize = lReelSize - 35;
  const rMotionBlurSize = rReelSize - 10;
  const [spin, setSpin] = useState<
    Animated.AnimatedInterpolation<number> | undefined
  >("0deg");

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

  const colors = useColors();

  const s = StyleSheet.create({
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
      backgroundColor: colors.Backgrounds.primary,
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
      backgroundColor: colors.Backgrounds.default,
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
      backgroundColor: AppColor.SNOW_WHITE,
      height: innerGearSize,
      width: innerGearSize,
      borderRadius: innerGearSize,
      margin: gearPadding,
    },
  });

  return (
    <LinearGradient colors={["#fb7ba2", "#fce043"]} style={s.label}>
      <FrontTitle />
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
      <UserSummary />
    </LinearGradient>
  );
});

export default TapeLabel;
