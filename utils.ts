import { Recording, Sound } from "expo-av/build/Audio";
import Spot from "./types/Spot";

export const randomId = () => {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
};

export const recordingToBlob = async (recording: Recording) => {
  const uri = recording.getURI();

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      try {
        resolve(xhr.response);
      } catch (error) {
        console.log("error:", error);
      }
    };
    xhr.onerror = (e) => {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri!, true);
    xhr.send(null);
  });
  return blob as Blob;
};
