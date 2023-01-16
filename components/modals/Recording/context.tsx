import { Audio } from "expo-av";
import { Recording, Sound } from "expo-av/build/Audio";
import { runInAction } from "mobx";
import { observer } from "mobx-react";

import React, { createContext, useContext, useEffect, useState } from "react";
import usePlayback from "../../../contexts/PlaybackContext";

type BoothContract = {
  recording?: Recording;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  playback: () => void;
  reset: () => void;
  audio?: Sound;
};

interface IRecordingBoothContext {
  children: React.ReactNode;
}

const RecordingBoothContext = createContext({} as BoothContract);
export const RecordingBoothProvider = observer(
  ({ children }: IRecordingBoothContext) => {
    const PlaybackStore = usePlayback();
    const [recording, setRecording] = useState<Recording | undefined>();
    const [audio, setAudio] = useState<Sound | undefined>();
    const [duration, setDuration] = useState(0);
    const startRecording = async () => {
      try {
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(recording);
        setAudio(undefined);
      } catch (err) {
        console.error("Failed to start recording", err);
      }
    };

    const stopRecording = async () => {
      if (!recording) {
        return;
      }
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      const { sound } = await recording.createNewLoadedSoundAsync();
      PlaybackStore.setAudio(sound, recording._finalDurationMillis);
      setAudio(sound);
      setDuration(recording._finalDurationMillis);
      setRecording(undefined);
    };

    const playback = () => {
      audio?.playAsync();
    };

    const reset = () => {
      audio?.stopAsync();
      setAudio(undefined);
      setRecording(undefined);
    };

    const value = {
      recording,
      startRecording,
      stopRecording,
      audio,
      playback,
      reset,
    };

    return (
      <RecordingBoothContext.Provider value={value}>
        {children}
      </RecordingBoothContext.Provider>
    );
  }
);

const useRecordingBooth = () => {
  const context = useContext(RecordingBoothContext);
  if (context === undefined) {
    throw new Error(
      "useRecordingBooth must be used within a RecordingProvider"
    );
  }
  return context;
};

export default useRecordingBooth;
