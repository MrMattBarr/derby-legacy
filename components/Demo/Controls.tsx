import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import useDemo from "../../contexts/DemoContext";
import usePlayback, { PlayState } from "../../contexts/PlaybackContext";
import { useColors } from "../../hooks/useColorScheme";
import { Sizes } from "../../styles/sizes";
import PlayButton from "../Buttons/PlayButton";
import ShareButton from "../ShareButton";
import { View } from "../Themed";
import EditButton from "./EditButton";

const Tape = observer(() => {
  const { isOwner, demo } = useDemo();
  const colors = useColors();
  const { togglePlay } = usePlayback();
  const s = StyleSheet.create({
    controls: {
      display: "flex",
      alignContent: "stretch",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignSelf: "stretch",
      borderBottomColor: colors.Borders.default,
      borderTopWidth: 3,
      borderBottomWidth: 3,
      backgroundColor: colors.Backgrounds.secondary,
      alignItems: "center",
      padding: Sizes.Spacings.STANDARD,
    },
  });
  const shareButtonLink = `derbydemos.app/demos/${demo?.id}`;
  const shareMessage = `Check out this demo created on Derby.\n${demo?.title} - ${demo?.userId}\n\n ${shareButtonLink}`;

  return (
    <View style={s.controls}>
      <PlayButton onToggle={togglePlay} />
      <ShareButton message={shareMessage} />
      {isOwner && <EditButton />}
    </View>
  );
});

export default Tape;
