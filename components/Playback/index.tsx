import { observer } from "mobx-react";
import React, { useState } from "react";
import { Modal } from "react-native";
import { useColors } from "../../hooks/useColorScheme";
import textStyles from "../../styles/text";
import Avatar from "../Avatar";
import { Text, View } from "../Themed";
import { generateStyles } from "./styles";

const PlaybackModal = observer(() => {
  const [focused, focus] = useState(false);
  const colors = useColors();
  const { h3, text } = textStyles(colors);
  const { holder, playbackModal, stack } = generateStyles(colors);

  return (
    <View style={holder}>
      <View style={playbackModal}>
        <View style={stack}>
          <Text style={h3}>Demo Title</Text>
          <Text style={text}>Duration</Text>
        </View>
      </View>
    </View>
  );
});
export default PlaybackModal;
