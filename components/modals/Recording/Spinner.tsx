import React, { useEffect, useState } from "react";
import { Animated, Easing, View } from "react-native";
import { AppColor } from "../../../constants/Colors";
import { useColors } from "../../../hooks/useColorScheme";
import Gear from "../../Demo/Tape/Gear";
import useRecordingBooth, { RecordingState } from "./context";
import { generateStyles } from "./styles";

const Spinner = () => {
  const { recordingState } = useRecordingBooth();
  const recording = recordingState === RecordingState.RECORDING;
  const colors = useColors();
  const [rotateAnimation] = useState(new Animated.Value(0));

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

  useEffect(() => {
    if (recording) {
      spin();
    } else {
      rotateAnimation.stopAnimation();
    }
  }, [recording]);

  const foreground = recording ? colors.Gear.active : colors.Gear.inactive;
  const background = recording
    ? colors.Backgrounds.primary
    : AppColor.TRANSPARENT;

  const { spinner } = generateStyles(colors, { recording });

  return (
    <View style={spinner}>
      <Animated.View style={spinStyle}>
        <Gear foreground={foreground} background={background} size={150} />
      </Animated.View>
    </View>
  );
};
export default Spinner;
