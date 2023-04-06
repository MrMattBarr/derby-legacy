import Loading from "components/Demo/Loading";
import PlaybackView from "components/modals/Recording/PlaybackView";
import { LoadableSound } from "types/AudioMetadata";

import useTake, { TakeProvider } from "contexts/TakeContext";
import React from "react";

const TakeSummary = () => {
  const { take } = useTake();
  if (!take || !take.audio) {
    return <Loading />;
  }

  const title = `Take ${take.number ?? "?"} `;

  const sound: LoadableSound = {
    sound: take.audio,
    metadata: take.metadata,
  };

  return (
    <PlaybackView metadata={take.metadata} title={title} loadable={sound} />
  );
};

const TakeLine = ({ id }: { id: string }) => {
  if (!id) {
    return <Loading />;
  }

  return (
    <TakeProvider id={id}>
      <TakeSummary />
    </TakeProvider>
  );
};

export default TakeLine;
