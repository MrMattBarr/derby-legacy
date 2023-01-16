import { observer } from "mobx-react";
import React, { ReactNode } from "react";
import { Pressable } from "react-native";
import useClient from "../../contexts/ClientContext";
import usePlayback from "../../contexts/PlaybackContext";
import { useColors } from "../../hooks/useColorScheme";
import BackgroundProgressBar from "../BackgroundProgressBar";
import { generateStyles } from "./styles";

interface iPlayback {
  children?: ReactNode;
}

const Playback = observer(({ children }: iPlayback) => {
  const playbackStore = usePlayback();
  const { playbackPercent, togglePlay } = playbackStore;
  const colors = useColors();
  const { isMobile } = useClient();
  const { playback } = generateStyles(colors, { isMobile });

  const toggle = () => {
    console.log("toggling");
    playbackStore.togglePlay();
  };

  return (
    <Pressable style={playback} onPress={toggle}>
      <BackgroundProgressBar progress={playbackStore.playbackPercent} />
      {children}
    </Pressable>
  );
});
export default Playback;
