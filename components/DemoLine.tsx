import { useLinkTo, useNavigation } from "@react-navigation/native";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import useDemos from "../contexts/DemosContext";
import useOverlay from "../contexts/OverlayContext";
import useSpots from "../contexts/SpotsContext";
import useColorScheme from "../hooks/useColorScheme";
import { listStyle } from "../listStyles";
import BackgroundProgressBar from "./BackgroundProgressBar";
import PlayButton from "./PlayButton";
import { Text, View } from "./Themed";

interface IDemoLine {
  demoId: string;
}

const DemoLine = observer(({ demoId }: IDemoLine) => {
  const colorScheme = useColorScheme();
  const linkTo = useLinkTo();
  const { play } = useOverlay();
  const [activeSpot, setActiveSpot] = useState(-1);
  const styles = listStyle(Colors[colorScheme]);
  const { demos } = useDemos();
  const { spots } = useSpots();
  const jsSpots = toJS(spots);
  const demo = toJS(demos[demoId]);
  const demoSpots = demo.spots.map((id) => (jsSpots || {})[id]);
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
    setActiveSpot(0);
    play({ type: "DEMO", id: demoId });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={goToDemo}
      style={styles.listItem}
    >
      <View style={styles.foreground}>
        <PlayButton onToggle={togglePlay} playing={false} />
        <View style={styles.mainContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{demo?.title}</Text>
            <View style={styles.spacer} />
          </View>
        </View>
      </View>
      <BackgroundProgressBar progress={progressPercent} />
    </TouchableOpacity>
  );
});
export default DemoLine;
