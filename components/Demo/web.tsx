import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import { IDemoDetail } from ".";
import { useColors } from "../../hooks/useColorScheme";
import { mainStyles } from "../../listStyles";
import Tape from "./Tape";
import TrackList from "./TrackList";

const WebView = observer(
  ({
    route: {
      params: { id },
    },
  }: IDemoDetail) => {
    console.log({ id });

    const colors = useColors();
    const styles = mainStyles(colors);
    return (
      <View style={styles.page}>
        <View style={styles.pageContent}>
          <Tape id={id} />
          <TrackList id={id} />
        </View>
      </View>
    );
  }
);

export default WebView;
