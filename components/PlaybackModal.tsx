import { FontAwesome } from "@expo/vector-icons";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import useDemos from "../contexts/DemosContext";
import useOverlay from "../contexts/OverlayContext";
import useSpots from "../contexts/SpotsContext";
import useColorScheme from "../hooks/useColorScheme";
import PlayButton from "./PlayButton";

const PlaybackModal = observer(() => {
  const { playing, play } = useOverlay();
  const { spots } = useSpots();
  const { demos } = useDemos();
  const jsPlaying = toJS(playing);
  console.log({ jsPlaying });
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const styles = StyleSheet.create({
    modalHolder: {
      flexGrow: 1,
      backgroundColor: "transparent",
      bottom: 80,
      display: "flex",
      position: "absolute",
      zIndex: 2,
      left: 0,
      right: 0,
    },
    modalView: {
      backgroundColor: colors.accentBG,
      padding: 10,
      borderColor: colors.hardBorder,
      borderTopWidth: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
    },
    grow: {
      flexGrow: 1,
    },
    text: {
      color: colors.text,
      fontSize: 25,
    },
  });

  return (
    <View style={styles.modalHolder}>
      {jsPlaying?.type === "SPOT" && (
        <View style={styles.modalView}>
          <PlayButton />
          <Text style={styles.text}>{toJS(spots)[jsPlaying.id].title}</Text>
          <View style={styles.grow} />
          <Pressable onPress={() => play(undefined)}>
            <FontAwesome
              name="minus"
              size={25}
              color={Colors[colorScheme!].text}
            />
          </Pressable>
        </View>
      )}
      {jsPlaying?.type === "DEMO" && (
        <View style={styles.modalView}>
          <PlayButton />
          <Text style={styles.text}>{toJS(demos)[jsPlaying.id].title}</Text>
          <View style={styles.grow} />
          <Pressable onPress={() => play(undefined)}>
            <FontAwesome
              name="minus"
              size={25}
              color={Colors[colorScheme!].text}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
});
export default PlaybackModal;
