import { observer } from "mobx-react";
import React from "react";
import Playback from "./index";
import useClient from "../../contexts/ClientContext";
import { DemoProvider } from "../../contexts/DemoContext";
import { useColors } from "../../hooks/useColorScheme";
import { Text, View } from "../Themed";
import Demo from "./Demo";
import { generateStyles } from "./styles";
import usePlayback from "../../contexts/PlaybackContext";

const PlaybackModal = observer(() => {
  const colors = useColors();
  const { isMobile } = useClient();
  const { holder } = generateStyles(colors, { isMobile });
  const playbackStore = usePlayback();
  const DemoContent = () => {
    return (
      <DemoProvider id={playbackStore.demo!.id}>
        <Demo />
      </DemoProvider>
    );
  };
  return (
    <View style={holder}>
      <Playback>{playbackStore.demo && <DemoContent />}</Playback>
    </View>
  );
});
export default PlaybackModal;
