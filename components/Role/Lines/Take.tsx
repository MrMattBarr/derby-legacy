import Loading from "components/Demo/Loading";
import PlaybackView from "components/modals/Recording/PlaybackView";
import { LoadableSound } from "types/AudioMetadata";

import useTake, { TakeProvider } from "contexts/TakeContext";
import React from "react";
import TakeButtons from "../TakeButtons";

const TakeSummary = ({
  title,
  compact,
}: {
  title?: string;
  compact?: boolean;
}) => {
  const { take } = useTake();
  if (!take || !take.audio) {
    return <Loading />;
  }

  const finalTitle = title ?? `Take ${take.number ?? "?"} `;

  const sound: LoadableSound = {
    sound: take.audio,
    metadata: take.metadata,
  };

  return (
    <PlaybackView
      metadata={take.metadata}
      title={finalTitle}
      loadable={sound}
      compact={compact}
      Buttons={TakeButtons}
    />
  );
};

const TakeLine = ({
  id,
  title,
  compact,
}: {
  id: string;
  title?: string;
  compact?: boolean;
}) => {
  if (!id) {
    return <Loading />;
  }

  return (
    <TakeProvider id={id}>
      <TakeSummary title={title} compact={compact} />
    </TakeProvider>
  );
};

export default TakeLine;
