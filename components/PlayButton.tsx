import { Entypo, FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useColors } from "../hooks/useColorScheme";
import { Text } from "./Themed";

interface IPlayButton {
  playing?: boolean;
  onToggle?: () => void;
}

export default function PlayButton({ onToggle, playing }: IPlayButton) {
  const colors = useColors();
  const styles = StyleSheet.create({
    button: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderRightColor: "#bcac8b",
      padding: 10,
      flexGrow: 1,
      color: colors.brandBackground,
    },
    playIcon: {
      borderWidth: 1,
      borderRadius: 50,
      marginRight: 20,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 50,
      height: 50,
      backgroundColor: colors.brandBackground,
      color: colors.text,
    },
    buttonText: {
      color: "#bcac8b",
      fontSize: 20,
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        if (onToggle) onToggle();
        return true;
      }}
      style={styles.button}
    >
      <View style={styles.playIcon}>
        {!playing && (
          <Entypo
            name="controller-play"
            style={{ marginLeft: 7 }}
            size={40}
            color={colors.text}
          />
        )}
        {playing && <FontAwesome name="pause" size={25} color={colors.text} />}
      </View>
      <Text style={styles.buttonText}>PLAY</Text>
    </TouchableOpacity>
  );
}
