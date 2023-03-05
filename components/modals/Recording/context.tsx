import { Audio } from "expo-av";
import { Recording } from "expo-av/build/Audio";
import { observer } from "mobx-react";

import React, { createContext, useContext, useEffect, useState } from "react";
import { MAX_SPOT_LENGTH } from "../../../constants/restrictions";
import usePlayback, {
  SoundWithDuration,
} from "../../../contexts/PlaybackContext";
import { useAuth } from "../../../stores/AuthStore";
import { useSpots } from "../../../stores/SpotsStore";
import { Visibility } from "../../../types/Demo";
import { SaveableSpot } from "../../../types/Spot";

export enum RecordingState {
  READY = "READY",
  RECORDING = "RECORDING",
  REVIEW = "REVIEW",
  POST = "POST",
}

export enum RecordingError {
  TOO_LONG = "TOO_LONG",
}

export const ErrorMessages: Record<RecordingError, String> = {
  [RecordingError.TOO_LONG]: `Unfortunately, at this time we can't support audio uploads that are over ${Math.ceil(
    MAX_SPOT_LENGTH / 1000
  )} seconds long. You'll have to try again and bring it in range. Good luck!`,
};

type BoothContract = {
  recording?: Recording;
  recordingState: RecordingState;
  startRecording: () => Promise<void>;
  error?: RecordingError;
  stopRecording: () => Promise<void>;
  reset: () => void;
  upload: () => void;
  readyToRecord: boolean;
};

interface IRecordingBoothContext {
  children: React.ReactNode;
}

const RecordingBoothContext = createContext({} as BoothContract);
export const RecordingBoothProvider = observer(
  ({ children }: IRecordingBoothContext) => {
    const PlaybackStore = usePlayback();
    const SpotsStore = useSpots();
    const authStore = useAuth();
    const uid = authStore.user!.uid;
    const [recordingState, setRecordingState] = useState(RecordingState.READY);
    const [recording, setRecording] = useState<Recording | undefined>();
    const [recordStart, setRecordStart] = useState(0);
    const [error, setError] = useState<RecordingError | undefined>();
    const audio = PlaybackStore.audio;

    const readyToRecord = !recording && !audio;

    const upload = async () => {
      const newSpot: SaveableSpot = {
        title: "New Spot",
        author: uid,
        tags: [],
        demos: [],
        url: "",
        visibility: Visibility.DRAFT,
        created: Date.now(),
        length: PlaybackStore.duration,
      };
      const uploadedDemo = await SpotsStore.createSpot(newSpot, recording!);
    };

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
        setRecordStart(Date.now());
        setRecording(recording);
        setRecordingState(RecordingState.RECORDING);
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
      const duration = Date.now() - recordStart;
      const withDuration = sound as SoundWithDuration;
      withDuration.duration = duration;
      PlaybackStore.load(withDuration, { autoPlay: false });
      setRecordingState(RecordingState.REVIEW);
      if (duration > MAX_SPOT_LENGTH) {
        setError(RecordingError.TOO_LONG);
      }
    };
    const reset = () => {
      setRecording(undefined);
      setError(undefined);
      setRecordingState(RecordingState.READY);
      PlaybackStore.reset();
    };

    useEffect(reset, []);

    const value = {
      recording,
      startRecording,
      stopRecording,
      error,
      recordingState,
      upload,
      reset,
      readyToRecord,
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
