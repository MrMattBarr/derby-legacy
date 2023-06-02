import { Sound } from "expo-av/build/Audio";
import { AudioMetaData } from "./AudioMetadata";

export enum ApprovalStatus {
  UNHEARD = "unheard",
  APPROVED = "approved",
  REJECTED = "rejected",
  HEARD = "heard",
}

export type Take = {
  line: string;
  status: ApprovalStatus;
  id: string;
  notes?: string;
  metadata: AudioMetaData;
  audio?: Sound;
};
