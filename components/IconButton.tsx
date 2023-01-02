import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useColors } from "../hooks/useColorScheme";

interface IPlayerButton {
  size?: number;
  onPress: () => void;
  icon: string;
  first?: boolean;
  label?: string;
}

const PlayerButton = ({ size, onPress, icon, first, label }: IPlayerButton) => {
  const finalSize = size ?? 50;
  const styles = StyleSheet.create({
    appButton: {
      fontSize: 12,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
      alignSelf: "stretch",
      borderLeftWidth: first ? 0 : 1,
      borderLeftColor: "#bcac8b",
    },
    buttonText: {
      marginTop: 10,
      color: "#bcac8b",
      fontSize: 15,
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.appButton}
      onPress={onPress}
    >
      <Entypo name={icon as any} size={finalSize * 0.65} color="#bcac8b" />
      {label && <Text style={styles.buttonText}>{label}</Text>}
    </TouchableOpacity>
  );
};

export default PlayerButton;
