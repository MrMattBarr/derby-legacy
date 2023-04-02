import { Sound } from "expo-av/build/Audio";

export type AudioMetaData = {
  duration: number;
  meters: number[];
};

export type LoadableSound = {
  sound: Sound;
  metadata: AudioMetaData;
};
