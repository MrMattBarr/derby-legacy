import { useFonts } from "@expo-google-fonts/kalam";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useColors } from "../../hooks/useColorScheme";
import { useSpots } from "../../stores/SpotsStore";
import { readableDuration } from "../../utils/utils";
import { Text, View } from "../Themed";

interface ITrack {
  id: string;
  index: number;
}
const Track = observer(({ id, index }: ITrack) => {
  const colors = useColors();

  const spotsStore = useSpots();
  const { spots } = spotsStore;
  const spot = spots[id];
  useEffect(() => {
    spotsStore.loadSpot(id);
  }, []);
  const [fontsLoaded] = useFonts({
    Kalam: require("/assets/fonts/Kalam-Regular.ttf"),
  });
  const s = StyleSheet.create({
    track: {
      backgroundColor: "transparent",
      borderBottomWidth: 1,
      borderBottomColor: colors.Borders.default,
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

  if (!fontsLoaded || !spot) {
    return <></>;
  }

  return (
    <View style={s.track}>
      <View style={s.foreground}>
        <Text style={s.trackTitle}>
          {index}. {spot?.title ?? "..."}
        </Text>
        <Text style={s.trackLength}>{readableDuration(spot?.length)}</Text>
      </View>
    </View>
  );
});

export default Track;
