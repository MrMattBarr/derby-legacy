import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { AppColor } from "../../../constants/Colors";
import { useColors } from "../../../hooks/useColorScheme";
import { Sizes } from "../../../styles/sizes";
import useRecordingBooth from "./context";

const BigButton = () => {
  const { recording, setRecording } = useRecordingBooth();
  const finalSize = 100;
  const ON_COLOR = AppColor.CHALK_RED;
  const OFF_COLOR = AppColor.SLATE;
  const colors = useColors();
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
      backgroundColor: recording ? ON_COLOR : OFF_COLOR,
      margin: Sizes.Spacings.STANDARD,
      width: buttonSize,
      height: buttonSize,
      marginBottom: 50,
    },
  });

  const start = () => {
    setRecording(true);
  };
  const stop = () => {
    setRecording(false);
  };

  return (
    <Pressable style={styles.appButton} onPressIn={start} onPressOut={stop}>
      <Entypo
        name="mic"
        size={finalSize * 0.65}
        color={recording ? AppColor.PURE_WHITE : ON_COLOR}
      />
    </Pressable>
  );
};

export default BigButton;
