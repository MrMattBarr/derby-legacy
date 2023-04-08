import { observer } from "mobx-react";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useSpots } from "stores/SpotsStore";
import { Text, View } from "../components/Themed";
import useDemo from "../contexts/DemoContext";
import AddSubtractButton from "./AddSubtractButton";
import BackgroundProgressBar from "./BackgroundProgressBar";

const Spot = observer(({ spotId }: { spotId: string }) => {
  const { demo } = useDemo();
  const spotsStore = useSpots();
  const spot = spotsStore.things[spotId];

  const demoSlot = (demo?.spots || []).indexOf(spotId);
  const isInDemo = demoSlot !== -1;
  const [playing, setPlaying] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  const styles = {} as any;

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.listItem}>
      <View style={styles.foreground}>
        <AddSubtractButton isAdd={!isInDemo} />
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
