import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import Background from "../Background";
import Controls from "./Controls";
import Tape from "./Tape/Tape";
import TrackList from "./TrackList";

const Preview = observer(() => {
  return (
    <Background>
      <View style={{ display: "flex", alignItems: "center" }}>
        <View
          style={{
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Tape />
        </View>
        <Controls />
        <TrackList />
      </View>
    </Background>
  );
});

export default Preview;
