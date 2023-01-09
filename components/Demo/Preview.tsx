import { observer } from "mobx-react";
import React from "react";
import Background from "../Background";
import Page from "../Page";
import Controls from "./Controls";
import Tape from "./Tape/Tape";
import TrackList from "./TrackList";

const Preview = observer(() => {
  return (
    <Background>
      <Page unpadded centered>
        <Tape />
        <Controls />
        <TrackList />
      </Page>
    </Background>
  );
});

export default Preview;
