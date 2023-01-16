import { FontAwesome } from "@expo/vector-icons";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Easing,
  GestureResponderEvent,
  Modal,
  Pressable,
  View,
} from "react-native";
import { useColors } from "../../../hooks/useColorScheme";
import { useModal } from "../../../contexts/ModalContext";
import { Text } from "../../Themed";
import { modalStyles } from "../styles";
import { generateStyles } from "./styles";
import useRecordingBooth from "./context";
import Gear from "../../Demo/Tape/Gear";
import { AppColor } from "../../../constants/Colors";

const Spinner = () => {
  const { recording } = useRecordingBooth();
  const colors = useColors();
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

  const { spinner } = generateStyles(colors, { recording: !!recording });

  return (
    <View style={spinner}>
      <Animated.View style={spinStyle}>
        <Gear foreground={foreground} background={background} size={150} />
      </Animated.View>
    </View>
  );
};
export default Spinner;
