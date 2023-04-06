import { Sound } from "expo-av/build/Audio";
import { AudioMetaData } from "./AudioMetadata";

export enum TakeStatus {
  UNHEARD = "unheard",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export type Take = {
  line: string;
  number: number;
  status: TakeStatus;
  id: string;
  metadata: AudioMetaData;
  audio?: Sound;
};
