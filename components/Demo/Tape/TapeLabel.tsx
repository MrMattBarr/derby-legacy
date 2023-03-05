import { LinearGradient } from "expo-linear-gradient";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { AppColor } from "../../../constants/Colors";
import usePlayback, { PlayState } from "../../../contexts/PlaybackContext";
import { useColors } from "../../../hooks/useColorScheme";
import { View } from "../../Themed";
import FrontTitle from "./FrontTitle";
import Gear from "./Gear";
import { useTape } from "./Tape";
import UserSummary from "./UserSummary";

const TapeLabel = observer(() => {
  const { unitSize } = useTape();
  const { state, playbackPercent } = usePlayback();

  let remainingProgress = 1 - (playbackPercent ?? 0);

  const totalReelSize = unitSize * 170;
  const minDialSize = unitSize * 50;
  const playableReelSize = totalReelSize - 2 * minDialSize;

  const gearPadding = unitSize * 2.5;
  const gearSize = unitSize * 30;
  const lReelSize = minDialSize + remainingProgress * playableReelSize;
  let lReelOffset = (lReelSize - gearSize) / 2 - gearPadding;
  const rReelSize = totalReelSize - lReelSize;
  const rReelOffset = (rReelSize - gearSize) / 2 - gearPadding;
  const lMotionBlurSize = lReelSize - 35;
  const rMotionBlurSize = rReelSize - 10;

  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));

  const spin = () => {
    Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear, // Easing is an additional import from react-native
        useNativeDriver: false, // To make use of native driver for performance
      })
    ).start(() => {
      rotateAnimation.setValue(0);
    });
  };

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["360deg", "0deg"],
  });

  const spinStyle = {
    transform: [
      {
        rotate: interpolateRotating,
      },
    ],
  };

  const colors = useColors();

  const s = StyleSheet.create({
    label: {
      position: "relative",
      borderColor: "black",
      borderWidth: unitSize / 1.5,
      borderRadius: unitSize * 5,
      aspectRatio: 2.1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    gears: {
      position: "absolute",
      borderColor: "black",
      borderWidth: 1,
      backgroundColor: colors.Backgrounds.secondary,
      borderRadius: gearSize * 1.2,
      top: "40%",
      width: "70%",
      overflow: "hidden",
      flexDirection: "row",
      display: "flex",
      justifyContent: "space-between",
    },
    reel: {
      position: "absolute",
      borderWidth: unitSize / 1.5,
      borderColor: "black",
      backgroundColor: AppColor.NEARLY_BLACK,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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
      borderRightWidth: unitSize * 1.5,
      borderLeftWidth: unitSize / 2,
      borderTopWidth: 0,
      borderBottomWidth: 0,
      borderRadius: lMotionBlurSize,
      width: lMotionBlurSize,
      height: lMotionBlurSize,
    },
    rMotionBlur: {
      backgroundColor: "transparent",
      borderColor: "#837b6f55",
      borderRightWidth: unitSize * 1.5,
      borderLeftWidth: unitSize / 2,
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
  });

  useEffect(() => {
    if (state === PlayState.PLAYING) {
      spin();
    } else {
      rotateAnimation.stopAnimation();
    }
  }, [state]);

  return (
    <LinearGradient colors={["#fb7ba2", "#fce043"]} style={s.label}>
      <FrontTitle />
      <View style={s.gears}>
        <Animated.View style={[s.lReel, s.reel, spinStyle]}>
          <View style={[s.lMotionBlur]} />
        </Animated.View>
        <Animated.View style={[s.rReel, s.reel, spinStyle]}>
          <View style={[s.rMotionBlur]} />
        </Animated.View>

        <Animated.View style={spinStyle}>
          <Gear
            size={gearSize}
            padding={gearPadding}
            background={colors.Backgrounds.primary}
          />
        </Animated.View>
        <Animated.View style={spinStyle}>
          <Gear
            size={gearSize}
            padding={gearPadding}
            background={colors.Backgrounds.primary}
          />
        </Animated.View>
      </View>
      <UserSummary />
    </LinearGradient>
  );
});

export default TapeLabel;
