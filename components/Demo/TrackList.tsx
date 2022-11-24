import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import AppLoading from "expo-app-loading";

import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Kalam_400Regular } from "@expo-google-fonts/kalam";
import PlayButton from "../PlayButton";
import { useColors } from "../../hooks/useColorScheme";
import useDemos from "../../contexts/DemosContext";
import { toJS } from "mobx";
import Track from "./Track";
import useDemo from "../../contexts/DemoContext";

interface ITrackList {
  id: string;
}
const TrackList = observer(() => {
  const colors = useColors();

  const { demo } = useDemo();
  const jsDemo = toJS(demo);
  const [fontsLoaded] = useFonts({
    Kalam: require("/assets/fonts/Kalam-Regular.ttf"),
  });
  const s = StyleSheet.create({
    trackList: {
      borderColor: "#bcac8b",
      backgroundColor: "transparent",
      maxWidth: 500,
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
    },
    lastTrack: {
      borderBottomWidth: 0,
    },
    trackText: {
      fontFamily: "Kalam",
      color: "#bcac8b",
    },
  });

  if (!fontsLoaded || !jsDemo?.spots) {
    return <AppLoading />;
  }

  return (
    <View style={s.trackList}>
      <View style={s.listHolder}>
        {(jsDemo?.spots ?? []).map((id, index) => {
          return <Track id={id} key={id} index={index + 1} />;
        })}
      </View>
    </View>
  );
});

export default TrackList;
