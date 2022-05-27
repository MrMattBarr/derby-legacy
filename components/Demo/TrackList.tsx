import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import AppLoading from "expo-app-loading";

import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Kalam_400Regular } from "@expo-google-fonts/kalam";
import PlayButton from "../PlayButton";
import { useColors } from "../../hooks/useColorScheme";

interface ITrackList {
  id: string;
}
const TrackList = observer(({ id }: ITrackList) => {
  const colors = useColors();
  const [fontsLoaded] = useFonts({
    Kalam: require("/assets/fonts/Kalam-Regular.ttf"),
  });
  const s = StyleSheet.create({
    trackList: {
      borderColor: "#bcac8b",
      backgroundColor: "transparent",
      padding: 20,
    },
    listHolder: {
      backgroundColor: colors.accentBG,
      borderRadius: 5,
      borderColor: "#bcac8b",
      borderWidth: 3,
    },
    track: {
      backgroundColor: "transparent",
      borderBottomWidth: 1,
      borderBottomColor: "#bcac8b99",
      margin: 10,
    },
    lastTrack: {},
    trackText: {
      fontFamily: "Kalam",
      color: "#bcac8b",
    },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={s.trackList}>
      <View style={s.listHolder}>
        <View style={s.track}>
          <Text style={s.trackText}>1. Fishies (7.14)</Text>
        </View>
        <View style={s.track}>
          <Text style={s.trackText}>2. Jerk Boss (3.4)</Text>
        </View>
        <View style={[s.track, s.lastTrack]}>
          <Text style={s.trackText}>3. Fancy Pants (12.2)</Text>
        </View>
        <View style={[s.track, s.lastTrack]}>
          <Text style={s.trackText}>4. Radio Show (21.2)</Text>
        </View>
      </View>
    </View>
  );
});

export default TrackList;
