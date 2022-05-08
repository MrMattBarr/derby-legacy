import { Audio } from "expo-av";
import { DocumentResult } from "expo-document-picker";
import { getStorage } from "firebase/storage";
import { randomId } from "../utils";

export type Spot = {
  title: string;
  transcript?: string;
  recordDate?: Date;
  uploadDate: Date;
  tags: string[];
  length?: number;
  audio?: Audio.Sound;
  author: string;
  id: string;
  url: string;
};

export const spotFromFile = (
  file: DocumentResult,
  partialSpot: Partial<Spot>
) => {
  if (file.type === "success") {
    const storage = getStorage();
    const spot: Spot = {
      title: file.name,
      tags: partialSpot.tags ?? [],
      author: partialSpot.author || "",
      recordDate: partialSpot.recordDate ?? new Date(),
      uploadDate: partialSpot.uploadDate ?? new Date(),
      id: partialSpot.id ?? randomId(),
      url: file.uri,
    };
    return spot as Spot;
  }
};

export default Spot;
