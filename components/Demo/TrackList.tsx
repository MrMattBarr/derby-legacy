import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import { View } from "../Themed";

import { useFonts } from "@expo-google-fonts/kalam";
import { toJS } from "mobx";
import useDemo from "../../contexts/DemoContext";
import { useColors } from "../../hooks/useColorScheme";
import Track from "./Track";
import { Sizes } from "../../styles/sizes";
import { generateStyles } from "./styles";

const TrackList = observer(() => {
  const colors = useColors();

  const { demo } = useDemo();
  const jsDemo = toJS(demo);
  const [fontsLoaded] = useFonts({
    Kalam: require("/assets/fonts/Kalam-Regular.ttf"),
  });
  const { trackList, listHolder } = generateStyles(colors);

  if (!fontsLoaded || !jsDemo?.spots) {
    return <></>;
  }

  return (
    <View style={trackList}>
      <View style={listHolder}>
        {(jsDemo?.spots ?? []).map((id, index) => {
          return <Track id={id} key={id} index={index + 1} />;
        })}
      </View>
    </View>
  );
});

export default TrackList;
