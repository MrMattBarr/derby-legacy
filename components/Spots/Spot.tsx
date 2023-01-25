import { observer } from "mobx-react";
import React from "react";
import { TouchableOpacity } from "react-native";
import usePlayback from "../../contexts/PlaybackContext";
import useSpot from "../../contexts/SpotContext";
import { useColors } from "../../hooks/useColorScheme";
import Nothing from "../Nothing";
import { Text } from "../Themed";
import { generateStyles } from "./styles";

const Spot = observer(() => {
  const colors = useColors();
  const playbackStore = usePlayback();
  const { spot } = useSpot();
  const styles = generateStyles(colors);

  if (!spot) {
    return <Nothing />;
  }
  const load = () => {
    playbackStore.load(spot);
  };

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.spot} onPress={load}>
      <Text style={styles.spotTitle}>{spot?.title}</Text>
    </TouchableOpacity>
  );
});
export default Spot;
