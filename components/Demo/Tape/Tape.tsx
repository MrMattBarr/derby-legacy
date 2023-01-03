import { useFonts } from "@expo-google-fonts/kalam";
import { runInAction } from "mobx";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Animated, Easing, ImageBackground } from "react-native";
import useDemo from "../../../contexts/DemoContext";
import usePlayback, { PlayState } from "../../../contexts/PlaybackContext";
import { useColors } from "../../../hooks/useColorScheme";
import { View } from "../../Themed";
import Screws from "./Screws";
import { generateStyles } from "../styles";
import TapeLabel from "./TapeLabel";

const Tape = observer(() => {
  const colors = useColors();
  const { active } = usePlayback();
  const [spin, setSpin] = useState<
    Animated.AnimatedInterpolation<number> | undefined
  >(undefined);

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

  const { demo } = useDemo();

  const playDemo = () => {
    const nextStatus =
      active.status === PlayState.PLAYING
        ? PlayState.PAUSED
        : PlayState.PLAYING;
    runInAction(() => {
      active.demo = demo?.id;
      active.status = nextStatus;
    });
    setSpin(calculateSpin());
  };

  const [fontsLoaded] = useFonts({
    Kalam: require("/assets/fonts/Kalam-Regular.ttf"),
  });

  const styles = generateStyles(colors);

  if (!fontsLoaded) {
    return <></>;
  }

  const image = {
    uri: "https://www.transparenttextures.com/patterns/skulls.png",
  };

  return (
    <View style={styles.tape}>
      <ImageBackground
        source={image}
        resizeMode="repeat"
        style={styles.tapeBgTexture}
      />
      <Screws />
      <TapeLabel />
    </View>
  );
});

export default Tape;
