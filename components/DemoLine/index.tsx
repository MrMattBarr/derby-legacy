import { useLinkTo, useNavigation } from "@react-navigation/native";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import usePlayback from "../../contexts/PlaybackContext";
import useColorScheme, { useColors } from "../../hooks/useColorScheme";
import { listStyle } from "../../listStyles";
import { useDemos } from "../../stores/DemosStore";
import { useSpots } from "../../stores/SpotsStore";
import { Visibility } from "../../types/Demo";
import BackgroundProgressBar from "../BackgroundProgressBar";
import PlayButton from "../Buttons/PlayButton";
import { Text, View } from "../Themed";
import { generateStyles } from "./styles";

interface IDemoLine {
  demoId: string;
}

const DemoLine = observer(({ demoId }: IDemoLine) => {
  const colors = useColors();
  const linkTo = useLinkTo();
  const [activeSpot, setActiveSpot] = useState(-1);
  const { listItem, foreground, mainContent, header, title } =
    generateStyles(colors);
  const demoStore = useDemos();
  const { spots } = useSpots();
  const jsSpots = toJS(spots);
  const demo = demoStore.demos[demoId];

  const demoSpots = demo?.spots?.map((id) => (jsSpots || {})[id]) ?? [];
  const progressPercent = 0;

  const goToDemo = () => {
    linkTo(`/demos/${demoId}`);
  };

  useEffect(() => {
    if (!demoSpots[activeSpot]) return;
    const isStarted = activeSpot >= 0;
    const stillInRange = activeSpot < demoSpots.length;
    const audioIsLoaded = !!demoSpots[activeSpot].audio;
    if (isStarted && stillInRange && audioIsLoaded) {
      demoSpots[activeSpot].audio?.playAsync();
      demoSpots[activeSpot].audio?.setOnPlaybackStatusUpdate(
        ({ didJustFinish }: any) => {
          if (didJustFinish) {
            setActiveSpot(activeSpot + 1);
          }
        }
      );
    }
  }, [activeSpot]);

  const togglePlay = () => {
    console.log({ demo });
  };

  console.log(toJS(demo));

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={goToDemo} style={listItem}>
      <View style={foreground}>
        <PlayButton onToggle={togglePlay} />
        <View style={mainContent}>
          <View style={header}>
            <Text style={title}>{demo?.title}</Text>
          </View>
        </View>
      </View>
      <BackgroundProgressBar progress={progressPercent} />
    </TouchableOpacity>
  );
});
export default DemoLine;
