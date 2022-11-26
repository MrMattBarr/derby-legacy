import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { useColors } from "../hooks/useColorScheme";

interface IIconButton {
  size?: number;
  onPress: () => void;
  icon: string;
  inverted?: boolean;
  label?: string;
}

const IconButton = ({ size, onPress, icon, inverted, label }: IIconButton) => {
  const finalSize = size ?? 50;
  const colors = useColors();
  const styles = StyleSheet.create({
    appButton: {
      marginHorizontal: 5,
      fontSize: 12,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: finalSize,
      height: finalSize,

      ...Platform.select({
        web: {
          borderWidth: 1,
          borderRadius: 50,
          backgroundColor: inverted ? colors.text : colors.brandBackground,
        },
      }),
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.appButton}
      onPress={onPress}
    >
      {/*  ts-ignore */}
      <Entypo
        name={icon as any}
        size={finalSize * 0.65}
        color={inverted ? colors.brandBackground : colors.text}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
