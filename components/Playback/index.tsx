import { observer } from "mobx-react";
import React, { useState } from "react";
import { DemoProvider } from "../../contexts/DemoContext";
import usePlayback from "../../contexts/PlaybackContext";
import { useColors } from "../../hooks/useColorScheme";
import textStyles from "../../styles/text";
import { View } from "../Themed";
import Demo from "./Demo";
import { generateStyles } from "./styles";

const Playback = observer(() => {
  const [focused, focus] = useState(false);
  const playbackStore = usePlayback;
  const { active } = playbackStore();
  const colors = useColors();
  const { holder, playbackModal } = generateStyles(colors);

  return (
    <View style={holder}>
      <View style={playbackModal}>
        {active?.demo && (
          <DemoProvider id={active.demo}>
            <Demo />
          </DemoProvider>
        )}
      </View>
    </View>
  );
});
export default Playback;
