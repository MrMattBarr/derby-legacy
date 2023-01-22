import { observer } from "mobx-react";
import React, { ReactNode, useEffect } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import useClient from "../../contexts/ClientContext";
import usePlayback from "../../contexts/PlaybackContext";
import { useColors } from "../../hooks/useColorScheme";
import BackgroundProgressBar from "../BackgroundProgressBar";
import { generateStyles } from "./styles";

interface iPlayback {
  children?: ReactNode;
  style?: object;
}

const Playback = observer(({ children, style }: iPlayback) => {
  const playbackStore = usePlayback();
  const colors = useColors();
  const { isMobile } = useClient();
  const { playback } = generateStyles(colors, { isMobile });

  const toggle = () => {
    playbackStore.togglePlay();
  };

  return (
    <Pressable style={{ ...playback, ...(style ?? {}) }} onPress={toggle}>
      <BackgroundProgressBar progress={playbackStore.playbackPercent} />
      {children}
    </Pressable>
  );
});
export default Playback;
