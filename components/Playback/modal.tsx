import { observer } from "mobx-react";
import React from "react";
import Playback from ".";
import useClient from "../../contexts/ClientContext";
import { DemoProvider } from "../../contexts/DemoContext";
import { useColors } from "../../hooks/useColorScheme";
import { View } from "../Themed";
import Demo from "./Demo";
import { generateStyles } from "./styles";

const PlaybackModal = observer(() => {
  const colors = useColors();
  const { isMobile } = useClient();
  const { holder } = generateStyles(colors, { isMobile });

  return (
    <View style={holder}>
      <Playback>
        <DemoProvider id={`E19GHG`}>
          <Demo />
        </DemoProvider>
      </Playback>
    </View>
  );
});
export default PlaybackModal;
