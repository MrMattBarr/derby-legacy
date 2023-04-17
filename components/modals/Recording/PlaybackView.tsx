import Playback from "components/Playback";
import WaveForm from "components/WaveForm";
import usePlayback, { Loadable, LoadableType } from "contexts/PlaybackContext";
import { Recording } from "expo-av/build/Audio";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React from "react";
import { Text, View } from "react-native";
import { Sizes } from "styles/sizes";
import { AudioMetaData } from "types/AudioMetadata";
import { readableDuration } from "utils/utils";
import { generateStyles } from "./styles";

interface IPlaybackView {
  Buttons?: () => JSX.Element;
  metadata?: AudioMetaData;
  loadable?: Loadable;
  compact?: boolean;
  title?: string;
  onPlay?: () => void;
  style?: any;
}

const PlaybackView = observer(
  ({
    Buttons,
    metadata,
    title,
    loadable,
    style,
    compact,
    onPlay,
  }: IPlaybackView) => {
    const colors = useColors();
    const { playback, playbackTitle, detail, playbackHolder, playbackTexts } =
      generateStyles(colors, { compact });

    const meters = metadata?.meters;
    const showDuration = !compact && !!metadata?.duration;

    return (
      <View style={playbackHolder}>
        <Playback loadable={loadable} onPlay={onPlay}>
          {meters && <WaveForm meters={meters} />}
          <View style={[playback, style]}>
            <View style={playbackTexts}>
              <Text style={[playbackTitle, style]}>{title}</Text>
              {showDuration && (
                <Text style={detail}>
                  {readableDuration(metadata.duration)}
                </Text>
              )}
            </View>
            {Buttons && <Buttons />}
          </View>
        </Playback>
      </View>
    );
  }
);
export default PlaybackView;
