import { useLinkTo } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { Pressable } from "react-native";
import useDemo from "../../contexts/DemoContext";
import usePlayback, { PlayState } from "../../contexts/PlaybackContext";
import { useColors } from "../../hooks/useColorScheme";
import { Sizes } from "../../styles/sizes";
import textStyles from "../../styles/text";
import PlayButton from "../Buttons/PlayButton";
import EditButton from "../Demo/EditButton";
import { Text, View } from "../Themed";
import { generateStyles } from "./styles";

const Demo = observer(() => {
  const colors = useColors();
  const linkTo = useLinkTo();
  const { demo, readableDuration, isOwner } = useDemo();
  const { h3, text } = textStyles(colors);
  const { stack, horizontal, content } = generateStyles(colors);
  const PlaybackStore = usePlayback();

  const visit = () => {
    linkTo(`/demos/${demo!.id}`);
  };

  const toggle = () => {
    PlaybackStore.togglePlay();
  };

  return (
    <Pressable style={{ ...horizontal, ...content }} onPress={visit}>
      <View style={stack}>
        <Text style={h3}>{demo?.title}</Text>
        <Text style={text}>{readableDuration}</Text>
      </View>
      <View style={{ ...horizontal, flexGrow: 0, alignItems: "center" }}>
        {isOwner && (
          <EditButton style={{ marginRight: Sizes.Spacings.STANDARD }} />
        )}
        <PlayButton
          onToggle={toggle}
          playing={PlaybackStore.state === PlayState.PLAYING}
        />
      </View>
    </Pressable>
  );
});
export default Demo;
