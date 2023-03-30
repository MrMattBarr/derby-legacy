import { Audio } from "expo-av";

enum TakeStatus {
  UNHEARD = "unheard",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export type SaveableTake = {
  line: string;
  status: TakeStatus;
  audio?: Audio.Sound;
};

export interface Take extends SaveableTake {
  id: string;
}
