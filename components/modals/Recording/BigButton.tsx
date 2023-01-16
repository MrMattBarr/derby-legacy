import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Platform, Pressable, StyleSheet } from "react-native";
import { AppColor } from "../../../constants/Colors";
import { useColors } from "../../../hooks/useColorScheme";
import * as Haptics from "expo-haptics";
import { Sizes } from "../../../styles/sizes";
import useRecordingBooth from "./context";
import useClient from "../../../contexts/ClientContext";

const BigButton = () => {
  const { recording, startRecording, stopRecording } = useRecordingBooth();
  const finalSize = 100;
  const ON_COLOR = AppColor.CHALK_RED;
  const OFF_COLOR = AppColor.PURE_BLACK;
  const { isApp } = useClient();
  const buttonSize = 200;
  const styles = StyleSheet.create({
    appButton: {
      fontSize: 12,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      borderColor: recording ? ON_COLOR : AppColor.SLATE,
      borderRadius: buttonSize,
      borderWidth: 1,
      backgroundColor: recording ? ON_COLOR : OFF_COLOR,
      margin: Sizes.Spacings.STANDARD,
      width: buttonSize,
      height: buttonSize,
      marginBottom: 50,
    },
  });

  const hapticStart = () => {
    startRecording();
    if (isApp) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <Pressable
      style={styles.appButton}
      onPressIn={hapticStart}
      onPressOut={stopRecording}
    >
      <Entypo
        name="mic"
        size={finalSize * 0.65}
        color={recording ? AppColor.PURE_BLACK : ON_COLOR}
      />
    </Pressable>
  );
};

export default BigButton;
