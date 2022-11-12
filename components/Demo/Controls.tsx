import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import { PlayState } from "../../contexts/PlaybackContext";
import PlayButton from "../PlayButton";
import { View } from "../Themed";

interface IControls {
  playDemo: () => void;
  status: PlayState;
}
const Tape = observer(({ playDemo, status }: IControls) => {
  const s = StyleSheet.create({
    controls: {
      display: "flex",
      padding: 10,
      justifyContent: "center",
      flexDirection: "row",
      flexGrow: 1,
      alignItems: "center",
      backgroundColor: "transparent",
    },
  });

  return (
    <View style={s.controls}>
      <PlayButton onToggle={playDemo} playing={status == PlayState.PLAYING} />
    </View>
  );
});

export default Tape;
