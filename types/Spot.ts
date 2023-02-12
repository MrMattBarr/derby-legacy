import { Audio } from "expo-av";
import { DocumentResult } from "expo-document-picker";
import { getStorage } from "firebase/storage";
import { randomId } from "../utils";
import { Visibility } from "./Demo";

export type SaveableSpot = {
  title: string;
  visibility: Visibility;
  transcript?: string;
  created: number;
  length: number;
  url: string;
  tags: string[];
  demos: string[];
  author: string;
};

export interface Spot extends SaveableSpot {
  audio?: Audio.Sound;
  id: string;
}

export const spotFromFile = (
  file: DocumentResult,
  partialSpot: Partial<Spot>
) => {
  if (file.type === "success") {
    const storage = getStorage();
    const spot: Spot = {
      title: file.name,
      visibility: partialSpot.visibility ?? Visibility.PRIVATE,
      length: partialSpot.length ?? 0,
      tags: partialSpot.tags ?? [],
      demos: partialSpot.demos ?? [],
      author: partialSpot.author || "",
      created: partialSpot.created ?? Date.now(),
      id: partialSpot.id ?? randomId(),
      url: file.uri,
    };
    return spot as Spot;
  }
};

export default Spot;
