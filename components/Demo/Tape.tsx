import { useFonts } from "@expo-google-fonts/kalam";
import AppLoading from "expo-app-loading";
import { runInAction } from "mobx";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Animated, Easing, ImageBackground, StyleSheet } from "react-native";
import useDemo from "../../contexts/DemoContext";
import usePlayback, { PlayState } from "../../contexts/PlaybackContext";
import { View } from "../Themed";
import Controls from "./Controls";
import Screws from "./Screws";
import TapeLabel from "./TapeLabel";

const Tape = observer(() => {
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
      paddingBottom: 0,
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
      <Screws />
      <TapeLabel />
      <Controls playDemo={playDemo} status={active.status} />
    </View>
  );
});

export default Tape;
