import { useLinkTo } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { Pressable } from "react-native";
import useDemo from "../../contexts/DemoContext";
import usePlayback, { PlayState } from "../../contexts/PlaybackContext";
import useSpot from "../../contexts/SpotContext";
import { useColors } from "../../hooks/useColorScheme";
import { Sizes } from "../../styles/sizes";
import textStyles from "../../styles/text";
import { readableDuration } from "../../utils/utils";
import PlayButton from "../Buttons/PlayButton";
import EditButton from "../Demo/EditButton";
import { Text, View } from "../Themed";
import { generateStyles } from "./styles";

const Spot = observer(() => {
  const colors = useColors();
  const linkTo = useLinkTo();
  const { spot, isOwner } = useSpot();
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
        <Text style={text}>{readableDuration(spot?.length)}</Text>
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
