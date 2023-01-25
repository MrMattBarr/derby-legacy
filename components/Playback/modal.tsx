import { observer } from "mobx-react";
import React from "react";
import Playback from "./index";
import useClient from "../../contexts/ClientContext";
import { DemoProvider } from "../../contexts/DemoContext";
import { useColors } from "../../hooks/useColorScheme";
import { Text, View } from "../Themed";
import SpotPreview from "../Spots/Spot";
import DemoPreview from "./Demo";
import { generateStyles } from "./styles";
import usePlayback, {
  getLoadableType,
  LoadableType,
} from "../../contexts/PlaybackContext";
import Nothing from "../Nothing";
import Demo from "../../types/Demo";
import { Spot } from "../../types/Spot";
import { SpotProvider } from "../../contexts/SpotContext";

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

  let Content = Nothing;
  const loadedType = getLoadableType(playbackStore.loadedElement);
  if (loadedType === LoadableType.DEMO) {
    Content = DemoContent;
  } else if (loadedType === LoadableType.SPOT) {
    Content = SpotContent;
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
