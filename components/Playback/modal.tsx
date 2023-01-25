import { observer } from "mobx-react";
import React from "react";
import Playback from "./index";
import useClient from "../../contexts/ClientContext";
import { DemoProvider } from "../../contexts/DemoContext";
import { useColors } from "../../hooks/useColorScheme";
import { Text, View } from "../Themed";
import DemoPreview from "./Demo";
import { generateStyles } from "./styles";
import usePlayback, {
  getLoadableType,
  LoadableType,
} from "../../contexts/PlaybackContext";
import Nothing from "../Nothing";
import Demo from "../../types/Demo";

const PlaybackModal = observer(() => {
  const colors = useColors();
  const { isMobile } = useClient();
  const { holder } = generateStyles(colors, { isMobile });
  const playbackStore = usePlayback();
  const DemoContent = () => {
    const demo: Demo = playbackStore.loadedElement;
    return (
      <DemoProvider id={demo!.id}>
        <DemoPreview />
      </DemoProvider>
    );
  };
  let Content = Nothing;
  if (getLoadableType(playbackStore.loadedElement) === LoadableType.DEMO) {
    Content = DemoContent;
  }
  return (
    <View style={holder}>
      <Playback>
        <Content />
      </Playback>
    </View>
  );
});
export default PlaybackModal;
