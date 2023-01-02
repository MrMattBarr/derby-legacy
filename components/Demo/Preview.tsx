import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import { useColors } from "../../hooks/useColorScheme";
import Page from "../Page";
import Controls from "./Controls";
import { generateStyles } from "./styles";
import Tape from "./Tape";
import TrackList from "./TrackList";

const Preview = observer(() => {
  const colors = useColors();
  const doNothing = () => {};
  const styles = generateStyles(colors);
  return (
    <Page>
      <View style={styles.player}>
        <Tape />
        <Controls playDemo={doNothing} />
      </View>
      <TrackList />
    </Page>
  );
});

export default Preview;
