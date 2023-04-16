import Loading from "components/Demo/Loading";
import PlaybackView from "components/modals/Recording/PlaybackView";
import { LoadableSound } from "types/AudioMetadata";

import useTake, { TakeProvider } from "contexts/TakeContext";
import React from "react";
import useProject from "contexts/ProjectContext";
import TakeButtons from "../TakeButtons";
import { ApprovalStatus } from "types/Take";
import { useColors } from "hooks/useColorScheme";

const TakeSummary = () => {
  const { take } = useTake();
  if (!take || !take.audio) {
    return <Loading />;
  }

  const colors = useColors();

  const title = `Take ${take.number ?? "?"} `;

  const sound: LoadableSound = {
    sound: take.audio,
    metadata: take.metadata,
  };

  let style = {} as any;
  if (take.status === ApprovalStatus.APPROVED) {
    style.borderColor = colors.Text.success;
    style.color = colors.Text.success;
  }

  return (
    <PlaybackView
      metadata={take.metadata}
      title={title}
      loadable={sound}
      style={style}
      Buttons={TakeButtons}
    />
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
