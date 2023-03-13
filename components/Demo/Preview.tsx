import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import { useColors } from "../../hooks/useColorScheme";
import Page from "../Page";
import Controls from "./Controls";
import TapeProvider from "./Tape/Context";
import Tape from "./Tape/Tape";
import TrackList from "./TrackList";

const Preview = observer(() => {
  const colors = useColors();
  return (
    <Page unpadded>
      <View style={{ display: "flex", alignItems: "center" }}>
        <View
          style={{
            alignSelf: "stretch",
            borderTopWidth: 2,
            display: "flex",
            flexDirection: "row",
            backgroundColor: colors.Backgrounds.primary,
            justifyContent: "center",
          }}
        >
          <TapeProvider>
            <Tape />
          </TapeProvider>
        </View>
        <Controls />
        <TrackList />
      </View>
    </Page>
  );
});

export default Preview;
