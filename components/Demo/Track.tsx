import { useFonts } from "@expo-google-fonts/kalam";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import usePlayback from "../../contexts/PlaybackContext";
import { useColors } from "../../hooks/useColorScheme";
import { useDemos } from "../../stores/DemosStore";
import { useSpots } from "../../stores/SpotsStore";
import BackgroundProgressBar from "../BackgroundProgressBar";
import { Text, View } from "../Themed";

interface ITrack {
  id: string;
  index: number;
}
const Track = observer(({ id, index }: ITrack) => {
  const colors = useColors();

  const { active } = usePlayback();
  const jsActive = toJS(active);
  const spotsStore = useSpots();
  const { spots } = spotsStore;
  const demoStore = useDemos();
  const { demos } = demoStore;
  useEffect(() => {
    spotsStore.loadSpot(id);
  }, []);

  const { demo } = toJS(active);
  const jsDemo = toJS(demos[demo || ""]);
  const alreadyPlayed =
    jsDemo?.spots.indexOf(id) < jsDemo?.spots.indexOf(active.spot || "");
  const spot = spots[id];

  const isActive = id === jsActive?.spot;
  let progress = alreadyPlayed ? 1 : 0;
  if (isActive && jsActive.playbackStatus?.isLoaded) {
    progress =
      jsActive.playbackStatus.positionMillis /
      jsActive.playbackStatus.durationMillis!;
  }
  const [fontsLoaded] = useFonts({
    Kalam: require("/assets/fonts/Kalam-Regular.ttf"),
  });
  const s = StyleSheet.create({
    track: {
      backgroundColor: "transparent",
      borderBottomWidth: 1,
      borderBottomColor: "#bcac8b99",
    },
    foreground: {
      backgroundColor: "transparent",
      padding: 10,
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      zIndex: 2,
    },
    trackTitle: {
      fontFamily: "Kalam",
      color: "#bcac8b",
    },
    trackLength: {
      fontFamily: "Kalam",
      color: "#bcac8b",
    },
  });

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <View style={s.track}>
      <BackgroundProgressBar progress={progress} />
      <View style={s.foreground}>
        <Text style={s.trackTitle}>
          {index}. {spot?.title ?? "..."}
        </Text>
        <Text style={s.trackLength}>{spot?.length}s</Text>
      </View>
    </View>
  );
});

export default Track;
