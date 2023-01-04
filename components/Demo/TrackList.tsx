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
      borderColor: colors.Borders.dramatic,
      backgroundColor: "transparent",
      maxWidth: 500,
    },
    listHolder: {
      marginTop: Sizes.Spacings.STANDARD,
      backgroundColor: colors.Backgrounds.primary,
      borderRadius: Sizes.CURVED_BORDER,
      borderColor: colors.Borders.dramatic,
      borderWidth: 2,
    },
  });

  if (!fontsLoaded || !jsDemo?.spots) {
    return <></>;
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
