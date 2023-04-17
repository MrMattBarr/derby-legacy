import Loading from "components/Demo/Loading";
import PlaybackView from "components/modals/Recording/PlaybackView";
import { LoadableSound } from "types/AudioMetadata";

import useTake, { TakeProvider } from "contexts/TakeContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import TakeButtons from "../TakeButtons";
import FreshTake from "./FreshTake";
import { generateStyles, statusColor } from "./styles";
import useRole from "contexts/RoleContext";
import { ApprovalStatus } from "types/Take";

const TakeSummary = observer(
  ({ title, compact }: { title?: string; compact?: boolean }) => {
    const { take, markHeard } = useTake();
    if (!take || !take.audio) {
      return <Loading />;
    }

    const colors = useColors();
    const { takeLine, remainder: playbackHolder } = generateStyles(colors);

    const { isTalent } = useRole();

    const finalTitle = title ?? `Take ${take.number ?? "?"} `;

    const sound: LoadableSound = {
      sound: take.audio,
      metadata: take.metadata,
    };

    const color = statusColor(take.status, colors, { isTalent });

    const style = {
      borderColor: color,
      color,
    };

    return (
      <View style={takeLine}>
        {!compact && <FreshTake />}
        <View style={playbackHolder}>
          <PlaybackView
            onPlay={markHeard}
            metadata={take.metadata}
            title={finalTitle}
            style={style}
            loadable={sound}
            compact={compact}
            Buttons={TakeButtons}
          />
        </View>
      </View>
    );
  }
);

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
