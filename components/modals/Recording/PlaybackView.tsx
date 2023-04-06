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

interface IRecording {
  recording: Recording;
  metadata: AudioMetaData;
}

interface IPlaybackView {
  Buttons?: () => JSX.Element;
  metadata?: AudioMetaData;
  loadable?: Loadable;
  title?: string;
}

const PlaybackView = observer(
  ({ Buttons, metadata, title, loadable }: IPlaybackView) => {
    const colors = useColors();
    const { playback, playbackTitle, detail, playbackHolder, playbackTexts } =
      generateStyles(colors);

    const meters = metadata?.meters;

    return (
      <View style={playbackHolder}>
        <Playback
          style={{ marginVertical: Sizes.Spacings.STANDARD }}
          loadable={loadable}
        >
          {meters && <WaveForm meters={meters} />}
          <View style={playback}>
            <View style={playbackTexts}>
              <Text style={playbackTitle}>{title}</Text>
              {metadata?.duration && (
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
