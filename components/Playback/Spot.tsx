import { observer } from "mobx-react";
import React from "react";
import usePlayback, { PlayState } from "../../contexts/PlaybackContext";
import useSpot from "../../contexts/SpotContext";
import { useColors } from "../../hooks/useColorScheme";
import textStyles from "../../styles/text";
import { readableDuration } from "../../utils/utils";
import PlayButton from "../Buttons/PlayButton";
import { Text, View } from "../Themed";
import { generateStyles } from "./styles";

const Spot = observer(() => {
  const colors = useColors();
  const { spot } = useSpot();
  const { h3, text } = textStyles(colors);
  const { stack, horizontal, content } = generateStyles(colors);
  const PlaybackStore = usePlayback();

  const toggle = () => {
    PlaybackStore.togglePlay();
  };

  return (
    <View style={{ ...horizontal, ...content }}>
      <View style={stack}>
        <Text style={h3}>{spot?.title}</Text>
        <Text style={text}>{readableDuration(spot?.metadata?.duration)}</Text>
      </View>
      <View style={{ ...horizontal, flexGrow: 0, alignItems: "center" }}>
        <PlayButton
          onToggle={toggle}
          playing={PlaybackStore.state === PlayState.PLAYING}
        />
      </View>
    </View>
  );
});
export default Spot;
