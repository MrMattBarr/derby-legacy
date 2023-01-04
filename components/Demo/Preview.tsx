import { observer } from "mobx-react";
import React from "react";
import Background from "../Background";
import Tape from "./Tape/Tape";
import TrackList from "./TrackList";

const Preview = observer(() => {
  return (
    <Background>
      <Tape />
      <TrackList />
    </Background>
  );
});

export default Preview;
