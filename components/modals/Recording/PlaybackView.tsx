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
  title?: string;
  style?: any;
}

const PlaybackView = observer(
  ({ Buttons, metadata, title, loadable, style }: IPlaybackView) => {
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
          <View style={[playback, style]}>
            <View style={playbackTexts}>
              <Text style={[playbackTitle, style]}>{title}</Text>
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
