import { Audio } from "expo-av";
import { DocumentResult } from "expo-document-picker";
import { randomId } from "../utils";
import { AudioMetaData } from "./AudioMetadata";
import { Visibility } from "./Demo";

export type Spot = {
  title: string;
  visibility: Visibility;
  transcript?: string;
  created: number;
  metadata: AudioMetaData;
  url: string;
  tags: string[];
  demos: string[];
  author: string;
  audio?: Audio.Sound;
  id: string;
};

export const spotFromFile = (
  file: DocumentResult,
  partialSpot: Partial<Spot>
) => {
  if (file.type === "success") {
    const spot: Spot = {
      title: file.name,
      visibility: partialSpot.visibility ?? Visibility.PRIVATE,
      tags: partialSpot.tags ?? [],
      demos: partialSpot.demos ?? [],
      author: partialSpot.author || "",
      created: partialSpot.created ?? Date.now(),
      id: partialSpot.id ?? randomId(),
      url: file.uri,
      metadata: {
        duration: partialSpot.metadata?.duration ?? 0,
        meters: partialSpot.metadata?.meters ?? [],
      },
    };
    return spot as Spot;
  }
};

export default Spot;
