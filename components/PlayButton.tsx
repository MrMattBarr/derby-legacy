import { Entypo, FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

interface IPlayButton {
  playing?: boolean;
  onToggle?: () => void;
}

export default function PlayButton({ onToggle, playing }: IPlayButton) {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    playButton: {
      borderWidth: 1,
      borderRadius: 50,
      marginRight: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 50,
      height: 50,
      backgroundColor: Colors[colorScheme!].brandBackground,
      color: Colors[colorScheme!].text,
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.playButton}
      onPress={() => {
        if (onToggle) onToggle();
        return true;
      }}
    >
      {!playing && (
        <Entypo
          name="controller-play"
          style={{ marginLeft: 7 }}
          size={40}
          color={Colors[colorScheme!].text}
        />
      )}
      {playing && (
        <FontAwesome name="pause" size={25} color={Colors[colorScheme!].text} />
      )}
    </TouchableOpacity>
  );
}
