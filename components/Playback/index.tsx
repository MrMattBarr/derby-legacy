import BackgroundProgressBar from "components/BackgroundProgressBar";
import useClient from "contexts/ClientContext";
import usePlayback from "contexts/PlaybackContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React, { ReactNode } from "react";
import { Pressable } from "react-native";
import { generateStyles } from "./styles";

interface iPlayback {
  children?: ReactNode;
  style?: object;
}

const Playback = observer(({ children, style }: iPlayback) => {
  const playbackStore = usePlayback();
  const colors = useColors();
  const { isMobile } = useClient();
  const { playback } = generateStyles(colors, {
    isMobile,
    hasBorder: !!children,
  });

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
