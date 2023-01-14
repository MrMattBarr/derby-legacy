import { Entypo } from "@expo/vector-icons";
import { AVPlaybackStatusSuccess } from "expo-av";
import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { AppColor } from "../../../constants/Colors";
import { PlayState } from "../../../contexts/PlaybackContext";
import { useColors } from "../../../hooks/useColorScheme";
import { Sizes } from "../../../styles/sizes";
import useRecordingBooth from "./context";

const PlaybackButton = () => {
  const { audio, recording, playback } = useRecordingBooth();
  const [isPlaying, setIsPlaying] = useState(false);

  const finalSize = 100;
  const ON_COLOR = AppColor.CHALK_RED;
  const OFF_COLOR = AppColor.SLATE;
  const buttonSize = 200;
  const styles = StyleSheet.create({
    appButton: {
      fontSize: 12,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      borderColor: AppColor.PURE_WHITE,
      borderRadius: buttonSize,
      borderWidth: 1,
      backgroundColor: OFF_COLOR,
      margin: Sizes.Spacings.STANDARD,
      width: buttonSize,
      height: buttonSize,
      marginBottom: 50,
    },
  });

  const updatePlayState = async () => {
    const audioStatus =
      (await audio?.getStatusAsync()) as AVPlaybackStatusSuccess;
    setIsPlaying(audioStatus.isPlaying);
  };

  if (!audio || !!recording || isPlaying) {
    return <></>;
  }

  return (
    <Pressable style={styles.appButton} onPress={playback}>
      <Entypo name="controller-play" size={finalSize * 0.65} color={ON_COLOR} />
    </Pressable>
  );
};

export default PlaybackButton;
