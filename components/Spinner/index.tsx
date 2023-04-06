import React, { useEffect, useState } from "react";
import { Animated, Easing } from "react-native";
import { View } from "../Themed";
import Brim from "./Brim";
import Spindle from "./Spindle";
import { generateStyles } from "./styles";
import { AppColor } from "constants/Colors";

interface ISpinner {
  size: number;
  spinning: boolean;
  color?: AppColor;
}
const Spinner = ({ size, spinning, color }: ISpinner) => {
  const INNER_SIZE = size / 1.64;
  const { holder, spindleHolder, brimHolder, outerHolder } =
    generateStyles(INNER_SIZE);
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
    outputRange: ["30deg", "390deg"], // 30deg looks nice paused
  });

  const spinStyle = {
    transform: [
      {
        rotate: interpolateRotating,
      },
    ],
  };

  useEffect(() => {
    if (spinning) {
      spin();
    } else {
      rotateAnimation.stopAnimation();
    }
  }, [spinning]);

  return (
    <View style={outerHolder}>
      <View style={holder}>
        <View style={spindleHolder}>
          <Animated.View style={spinStyle}>
            <Spindle size={INNER_SIZE} foreground={color} />
          </Animated.View>
        </View>
        <View style={brimHolder}>
          <Brim size={size} foreground={color} />
        </View>
      </View>
    </View>
  );
};

Spinner.defaultProps = {
  size: 200,
  spinning: false,
};

export default Spinner;
