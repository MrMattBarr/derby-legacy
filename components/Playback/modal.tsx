import { observer } from "mobx-react";
import React from "react";
import useClient from "../../contexts/ClientContext";
import { DemoProvider } from "../../contexts/DemoContext";
import usePlayback, {
  LoadableType,
  getLoadableType,
} from "../../contexts/PlaybackContext";
import { SpotProvider } from "../../contexts/SpotContext";
import { useColors } from "../../hooks/useColorScheme";
import Demo from "../../types/Demo";
import { Spot } from "../../types/Spot";
import { View } from "../Themed";
import DemoPreview from "./Demo";
import SpotPreview from "./Spot";
import Playback from "./index";
import { generateStyles } from "./styles";

const PlaybackModal = observer(() => {
  const colors = useColors();
  const { isMobile } = useClient();
  const { holder } = generateStyles(colors, { isMobile });
  const playbackStore = usePlayback();
  const DemoContent = () => {
    const demo = playbackStore.loadedElement as Demo;
    return (
      <DemoProvider id={demo!.id}>
        <DemoPreview />
      </DemoProvider>
    );
  };
  const SpotContent = () => {
    const spot = playbackStore.loadedElement as Spot;
    return (
      <SpotProvider id={spot!.id}>
        <SpotPreview />
      </SpotProvider>
    );
  };

  let Content = undefined;
  const loadedType = getLoadableType(playbackStore.loadedElement);
  if (loadedType === LoadableType.DEMO) {
    Content = DemoContent;
  } else if (loadedType === LoadableType.SPOT) {
    Content = SpotContent;
  }

  return (
    <View style={holder}>
      <Playback>{Content && <Content />}</Playback>
    </View>
  );
});
export default PlaybackModal;
