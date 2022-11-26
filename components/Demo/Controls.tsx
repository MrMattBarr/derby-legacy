import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import useDemo from "../../contexts/DemoContext";
import { PlayState } from "../../contexts/PlaybackContext";
import PlayButton from "../PlayButton";
import ShareButton from "../ShareButton";
import { View } from "../Themed";
import EditButton from "./EditButton";

interface IControls {
  playDemo: () => void;
  status?: PlayState;
}
const Tape = observer(({ playDemo, status }: IControls) => {
  const { isOwner } = useDemo();
  const s = StyleSheet.create({
    controls: {
      display: "flex",
      padding: 10,
      justifyContent: "center",
      flexDirection: "row",
      flexGrow: 1,
      borderColor: "#000",
      alignItems: "center",
      backgroundColor: "transparent",
    },
  });

  return (
    <View style={s.controls}>
      {isOwner && <EditButton />}
      <PlayButton onToggle={playDemo} playing={status == PlayState.PLAYING} />
      <ShareButton message="what a cool fish" />
    </View>
  );
});

export default Tape;
