import { Audio } from "expo-av";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import useDemo from "../contexts/DemoContext";
import usePlayback from "../contexts/PlaybackContext";
import useSpots from "../contexts/SpotsContext";
import { listStyle } from "../listStyles";
import AddSubtractButton from "./AddSubtractButton";
import BackgroundProgressBar from "./BackgroundProgressBar";
import TagList from "./TagList";

const Spot = observer(({ spotId }: { spotId: string }) => {
  const { spotIds, addSpot, removeSpot } = useDemo();
  const { spots } = useSpots();
  const { focus, play } = usePlayback();
  const spot = toJS(spots[spotId]);

  const demoSlot = (spotIds || []).indexOf(spotId);
  const isInDemo = demoSlot !== -1;
  const [playing, setPlaying] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  const update = (status: any) => {
    setProgressPercent(status.positionMillis / spot.length!);
    if (status.didJustFinish) {
      spot.audio?.pauseAsync();
      setPlaying(false);
      setProgressPercent(0);
      spot.audio?.setPositionAsync(0);
    }
  };
  //

  const togglePlay = async () => {
    play({ type: "SPOT", id: spotId });
  };

  const addRemoveSpot = async () => {
    if (!isInDemo) {
      addSpot(spotId);
    } else {
      removeSpot(spotId);
    }
  };

  const colorScheme = useColorScheme() || "dark";

  const styles = listStyle(Colors[colorScheme]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.listItem}
      onPress={togglePlay}
      onLongPress={() => {
        focus({ id: spotId, type: "Spot" });
      }}
    >
      <View style={styles.foreground}>
        <AddSubtractButton onToggle={addRemoveSpot} isAdd={!isInDemo} />
        <View style={styles.mainContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{spot?.title}</Text>
            <View style={styles.spacer} />
          </View>
          {/* <TagList tags={spot?.tags} /> */}
        </View>
      </View>
      <BackgroundProgressBar progress={progressPercent} />
    </TouchableOpacity>
  );
});

export default Spot;
