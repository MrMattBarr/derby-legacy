import BackgroundProgressBar from "components/BackgroundProgressBar";
import useClient from "contexts/ClientContext";
import usePlayback, { Loadable } from "contexts/PlaybackContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React, { ReactNode, useEffect, useState } from "react";
import { Pressable, Text } from "react-native";
import { generateStyles } from "./styles";

interface iPlayback {
  children?: ReactNode;
  loadable?: Loadable;
  onPlay?: () => void;
  style?: object;
}

const Playback = observer(
  ({ children, style, loadable, onPlay }: iPlayback) => {
    const [id, setId] = useState<number | undefined>();
    const playbackStore = usePlayback();
    const colors = useColors();
    const { isMobile } = useClient();
    const { playback } = generateStyles(colors, {
      isMobile,
      hasBorder: !!children,
    });

    useEffect(() => {
      setId(Math.random());
    }, []);

    const toggle = () => {
      playbackStore.loadOrToggle(loadable, { playerId: id });
      if (onPlay) {
        onPlay();
      }
    };

    const active = playbackStore.playerId === id;

    return (
      <Pressable style={{ ...playback, ...(style ?? {}) }} onPress={toggle}>
        {active && (
          <BackgroundProgressBar progress={playbackStore.playbackPercent} />
        )}
        {children}
      </Pressable>
    );
  }
);
export default Playback;
