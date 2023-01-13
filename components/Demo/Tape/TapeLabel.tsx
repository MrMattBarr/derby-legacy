import { LinearGradient } from "expo-linear-gradient";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { Stop } from "react-native-svg";
import { AppColor } from "../../../constants/Colors";
import usePlayback, { PlayState } from "../../../contexts/PlaybackContext";
import { useColors } from "../../../hooks/useColorScheme";
import { View } from "../../Themed";
import UserSummary from "../UserSummary";
import FrontTitle from "./FrontTitle";
import Gear from "./Gear";

const TapeLabel = observer(() => {
  const {
    active: { status },
    playbackPercent,
  } = usePlayback();

  let remainingProgress = 1 - (playbackPercent ?? 0);

  const totalReelSize = 200;
  const minDialSize = 70;
  const playableReelSize = totalReelSize - 2 * minDialSize;

  const gearPadding = 5;
  const gearSize = 40;
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
    outputRange: ["0deg", "720deg"],
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
  });

  useEffect(() => {
    if (status === PlayState.PLAYING) {
      spin();
    } else {
      rotateAnimation.stopAnimation();
    }
  }, [status]);

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
