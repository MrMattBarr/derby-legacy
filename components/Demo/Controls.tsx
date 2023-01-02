import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import useDemo from "../../contexts/DemoContext";
import { PlayState } from "../../contexts/PlaybackContext";
import { useColors } from "../../hooks/useColorScheme";
import PlayButton from "../PlayButton";
import ShareButton from "../ShareButton";
import { View } from "../Themed";
import EditButton from "./EditButton";

interface IControls {
  playDemo: () => void;
  status?: PlayState;
}
const Tape = observer(({ playDemo, status }: IControls) => {
  const { isOwner, demo } = useDemo();
  const s = StyleSheet.create({
    controls: {
      display: "flex",
      marginVertical: 10,
      borderRadius: 5,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      alignContent: "stretch",
      flexDirection: "row",
      flexGrow: 1,
      borderColor: "#bcac8b",
      alignItems: "center",
      backgroundColor: "transparent",
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
    },
  });
  const shareButtonLink = `derbydemos.app/demos/${demo?.id}`;
  const shareMessage = `Check out this demo created on Derby.\n${demo?.title} - ${demo?.userId}\n\n ${shareButtonLink}`;

  return (
    <View style={s.controls}>
      <PlayButton onToggle={playDemo} playing={status == PlayState.PLAYING} />
      <ShareButton message={shareMessage} />
      {isOwner && <EditButton />}
    </View>
  );
});

export default Tape;
