import IconButton from "components/IconButton";
import { Recording } from "expo-av/build/Audio";
import { observer } from "mobx-react";
import React from "react";
import { Text, View } from "react-native";
import { AudioMetaData } from "types/AudioMetadata";
import usePlayback from "../../../contexts/PlaybackContext";
import { useColors } from "../../../hooks/useColorScheme";
import { Sizes } from "../../../styles/sizes";
import { readableDuration } from "../../../utils/utils";
import Playback from "../../Playback";
import useRecordingBooth from "./context";
import { generateStyles } from "./styles";
import WaveForm from "components/WaveForm";

interface IRecording {
  recording: Recording;
  metadata: AudioMetaData;
}

interface IPlaybackView {
  onSubmit?: (results: IRecording) => void;
  submitIcon?: string;
}

const PlaybackView = observer(({ onSubmit, submitIcon }: IPlaybackView) => {
  const playbackStore = usePlayback();
  const { reset, recording, metadata } = useRecordingBooth();
  const duration = playbackStore.duration;
  const colors = useColors();
  const {
    playback,
    playbackTitle,
    detail,
    playbackHolder,
    playbackTexts,
    buttons,
  } = generateStyles(colors);

  const canSubmit = recording && metadata && onSubmit;

  const submit = () => {
    if (canSubmit) {
      onSubmit({ recording, metadata });
    }
  };

  return (
    <View style={playbackHolder}>
      <Playback style={{ marginVertical: Sizes.Spacings.STANDARD }}>
        {metadata && <WaveForm meters={metadata.meters} />}
        <View style={playback}>
          <View style={playbackTexts}>
            <Text style={playbackTitle}>New Recording</Text>
            <Text style={detail}>{readableDuration(duration)}</Text>
          </View>
          <View style={buttons}>
            <IconButton
              onPress={reset}
              icon="cross"
              style={{
                marginRight: Sizes.Spacings.STANDARD,
                backgroundColor: colors.Backgrounds.empty,
              }}
            />
            {canSubmit && (
              <IconButton
                onPress={submit}
                icon={submitIcon ?? "save"}
                style={{
                  backgroundColor: colors.Backgrounds.default,
                }}
              />
            )}
          </View>
        </View>
      </Playback>
    </View>
  );
});
export default PlaybackView;
