import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";
import { runInAction } from "mobx";
import { useLocalObservable } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { updateSpot } from "../api";
import { useDemos } from "../stores/DemosStore";
import { useSpots } from "../stores/SpotsStore";
import Demo from "../types/Demo";
import Spot from "../types/Spot";

const MS_TO_S = 1000;

export enum PlayState {
  PLAYING = "PLAYING",
  PAUSED = "PAUSED",
  READY = "READY",
}

type PlaybackContract = {
  audio?: Audio.Sound;
  state: PlayState;
  playbackPercent?: number;
  duration: number;
  demo?: Demo;
  spot?: Spot;
  spots: Spot[];
  togglePlay: () => void;
  play: (timeStamp?: number) => void;
  setAudio: (audio: Audio.Sound, duration: number) => void;
  pause: () => void;
  resume: () => void;
  onFinish: () => void;
  reset: () => void;
  updatePlaybackPercent: (status: AVPlaybackStatus) => void;
  focusDemo: (id: string) => void;
};

const PlaybackContext = React.createContext({} as PlaybackContract);
export const PlaybackProvider = ({ children }: any) => {
  const DemosStore = useDemos();
  const SpotsStore = useSpots();
  const store = useLocalObservable<PlaybackContract>(() => ({
    playbackPercent: 0,
    state: PlayState.READY,
    duration: 0,
    spots: [],
    pause() {
      runInAction(() => {
        this.audio?.pauseAsync();
        this.state = PlayState.PAUSED;
      });
    },
    onFinish() {
      // let foundActive = false;
      // let foundNext = false;
      // this.spots.forEach((nextSpot) => {
      //   if (nextSpot.id === this.spot!.id) {
      //     foundActive = true;
      //   } else {
      //     if (foundActive && !foundNext) {
      //       foundNext = true;
      //       this.audio?.setOnPlaybackStatusUpdate(null);
      //       this.audio = nextSpot.audio;
      //       this.audio?.setOnPlaybackStatusUpdate(
      //         (status: AVPlaybackStatus) => {
      //           runInAction(() => {
      //             this.spot = nextSpot;
      //             this.updatePlaybackPercent(status);
      //           });
      //         }
      //       );
      //       this.audio?.playFromPositionAsync(0);
      //     }
      //   }
      // });
      // if (!foundNext) {
      runInAction(() => {
        this.state = PlayState.READY;
      });
      // }
    },
    togglePlay() {
      switch (this.state) {
        case PlayState.PAUSED:
          this.resume();
          break;
        case PlayState.PLAYING:
          this.pause();
          break;
        case PlayState.READY:
          this.play();
          break;
        default:
          console.warn("unkown play state");
      }
    },
    resume() {
      runInAction(() => {
        this.audio?.playAsync();
        this.state = PlayState.PLAYING;
      });
    },
    setAudio(audio: Audio.Sound, duration: number) {
      runInAction(() => {
        console.log({ duration });
        this.audio = audio;
        this.playbackPercent = 0;
        this.duration = duration;
      });
    },
    focusDemo(id: string) {
      runInAction(() => {
        const demo = DemosStore.demos[id];
        this.demo = demo;
        this.spots = (demo.spots ?? []).map(
          (spotId) => SpotsStore.spots[spotId]
        );
        this.playbackPercent = 0;
        console.log(this.spots[0]);
        if (this.spots[0]?.audio) {
          this.setAudio(this.spots[0].audio, this.spots[0].length);
        }
        this.play();
      });
    },
    updatePlaybackPercent(status: AVPlaybackStatus) {
      const { positionMillis, durationMillis } =
        status as AVPlaybackStatusSuccess;

      // let elapsed = 0;
      // let total = 0;
      // let foundActive = false;

      // this.spots.forEach((nextSpot) => {
      //   const spotLength = (nextSpot.length ?? 0);
      //   if (!foundActive) {
      //     if (this.spot!.id !== nextSpot.id) {
      //       elapsed += spotLength;
      //     } else {
      //       elapsed += positionMillis;
      //       foundActive = true;
      //     }
      //   }
      //   total += spotLength;
      // });
      const percent = positionMillis / this.duration;
      const finishedSpot = durationMillis === positionMillis;
      runInAction(() => {
        this.playbackPercent = finishedSpot ? 1 : percent;
      });
      if (finishedSpot) {
        runInAction(() => this.onFinish());
      }
    },
    async play(timeStamp?: number) {
      // const activeSpotIndex = 0;
      let adjustedPosition = timeStamp ?? 0;
      // const isTooLong = false;
      // const spotId = this.demo.spots![activeSpotIndex];
      // while (isTooLong) {}
      // runInAction(() => {
      //   const spot = SpotsStore.spots[spotId];
      //   this.spot = spot;
      //   this.audio = spot.audio;
      // });
      await this.audio?.setOnPlaybackStatusUpdate(
        (status: AVPlaybackStatus) => {
          runInAction(() => {
            this.updatePlaybackPercent(status);
          });
        }
      );
      await this.audio?.playFromPositionAsync(adjustedPosition);
      await this.audio?.setProgressUpdateIntervalAsync(25);
      runInAction(() => {
        this.state = PlayState.PLAYING;
      });
    },
    reset() {
      this.audio?.stopAsync();
      runInAction(() => {
        this.audio = undefined;
      });
    },
  }));

  return (
    <PlaybackContext.Provider value={store}>
      {children}
    </PlaybackContext.Provider>
  );
};

const usePlayback = () => {
  const context = useContext(PlaybackContext);
  if (context === undefined) {
    throw new Error("usePlayback must be used within a PlaybackProvider");
  }
  return context;
};

export default usePlayback;
