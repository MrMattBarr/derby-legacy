import { observer } from "mobx-react";
import React from "react";
import { StyleSheet, View } from "react-native";
import { IDemoDetail } from ".";
import { DemoProvider } from "../../contexts/DemoContext";
import { PlayState } from "../../contexts/PlaybackContext";
import { useColors } from "../../hooks/useColorScheme";
import { mainStyles } from "../../listStyles";
import Controls from "./Controls";
import Tape from "./Tape";
import TrackList from "./TrackList";

const WebView = observer(
  ({
    route: {
      params: { id },
    },
  }: IDemoDetail) => {
    const colors = useColors();
    const styles = mainStyles(colors);
    const doNothing = () => {};

    const s = StyleSheet.create({
      player: {
        borderColor: "black",
        borderWidth: 3,
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#111",
        display: "flex",
        marginBottom: 20,
        alignSelf: "flex-start",
      },
      holder: {
        display: "flex",
        alignSelf: "flex-start",
        flexDirection: "column",
      },
    });
    return (
      <View style={styles.page}>
        <View style={styles.pageContent}>
          <View style={s.holder}>
            <DemoProvider id={id}>
              <View style={s.player}>
                <Tape />
                <Controls playDemo={doNothing} />
              </View>
              <TrackList />
            </DemoProvider>
          </View>
        </View>
      </View>
    );
  }
);

export default WebView;
