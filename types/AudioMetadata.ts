import { Sound } from "expo-av/build/Audio";

export type AudioMetaData = {
  duration: number;
  meters: number[];
};

export interface LoadableSound {
  sound: Sound;
  metadata: AudioMetaData;
}
