import { Entypo } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors, { AppColor } from "../../../constants/Colors";
import useClient from "../../../contexts/ClientContext";
import { useColors } from "../../../hooks/useColorScheme";
import { Sizes } from "../../../styles/sizes";
import Nothing from "../../Nothing";
import useRecordingBooth from "./context";
import Texts from "./texts";

const SaveButton = () => {
  const colors = useColors();
  const { error, upload } = useRecordingBooth();
  const { isApp } = useClient();
  const buttonSize = 200;
  const finalSize = 150;
  if (error) {
    return <Nothing />;
  }
  const styles = StyleSheet.create({
    appButton: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      borderColor: colors.Borders.dramatic,
      borderRadius: buttonSize,
      borderWidth: 1,
      backgroundColor: colors.Backgrounds.success,
      margin: Sizes.Spacings.STANDARD,
      width: buttonSize,
      height: buttonSize,
      marginBottom: 50,
    },
  });

  const hapticsUpload = () => {
    if (isApp) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    upload();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={styles.appButton}
      onPress={hapticsUpload}
    >
      <Entypo
        name="upload-to-cloud"
        size={finalSize * 0.65}
        color={colors.Text.default}
      />
    </TouchableOpacity>
  );
};

export default SaveButton;
