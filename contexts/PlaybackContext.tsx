import { AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";
import { runInAction } from "mobx";
import { useLocalObservable } from "mobx-react";
import React, { useContext } from "react";
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

type Active = {
  demo?: string;
  spot?: string;
  status: PlayState;
};

type PlaybackContract = {
  active: Active;
  playbackPercent?: number;
  demo?: Demo;
  spots: Spot[];
  play: (timeStamp: number) => void;
  pause: () => void;
  onFinish: (spot: Spot) => void;
  setPlaybackPercent: (status: AVPlaybackStatus, spot: Spot) => void;
  focusDemo: (id: string) => void;
};

const PlaybackContext = React.createContext({} as PlaybackContract);
export const PlaybackProvider = ({ children }: any) => {
  const DemosStore = useDemos();
  const SpotsStore = useSpots();
  const store = useLocalObservable<PlaybackContract>(() => ({
    playbackPercent: 0,
    active: {
      status: PlayState.PAUSED,
    },
    spots: [],
    pause() {},
    onFinish(spot: Spot) {
      let foundActive = false;
      let foundNext = false;

      this.spots.forEach((nextSpot) => {
        if (nextSpot.id === spot.id) {
          foundActive = true;
        } else {
          if (foundActive && !foundNext) {
            foundNext = true;
            spot.audio?.setOnPlaybackStatusUpdate(null);
            nextSpot.audio?.setOnPlaybackStatusUpdate(
              (status: AVPlaybackStatus) => {
                runInAction(() => {
                  this.setPlaybackPercent(status, nextSpot);
                });
              }
            );
            nextSpot.audio?.playFromPositionAsync(0);
            runInAction(() => {
              this.active.status = PlayState.PLAYING;
            });
          }
        }
      });

      if (!foundNext) {
        runInAction(() => {
          this.active.status = PlayState.READY;
        });
      }
    },
    focusDemo(id: string) {
      runInAction(() => {
        this.active.demo = id;
        const demo = DemosStore.demos[id];
        this.demo = demo;
        this.spots = (demo.spots ?? []).map(
          (spotId) => SpotsStore.spots[spotId]
        );
        this.playbackPercent = 0;
      });
    },
    setPlaybackPercent(status: AVPlaybackStatus, spot: Spot) {
      const { positionMillis, durationMillis } =
        status as AVPlaybackStatusSuccess;
      const durationSecs = durationMillis! / 1000;
      if (durationSecs !== spot.length) {
        runInAction(() => {
          spot.length = durationSecs;
          updateSpot(spot);
        });
      }

      let elapsed = 0;
      let total = 0;
      let foundActive = false;

      this.spots.forEach((nextSpot) => {
        const spotLength = (nextSpot.length ?? 0) * MS_TO_S;
        if (!foundActive) {
          if (spot.id !== nextSpot.id) {
            elapsed += spotLength;
          } else {
            elapsed += positionMillis;
            foundActive = true;
          }
        }
        total += spotLength;
      });
      const percent = elapsed / total;
      runInAction(() => {
        this.playbackPercent = percent;
      });
      const finishedSpot = durationMillis === positionMillis;
      if (finishedSpot) {
        runInAction(() => this.onFinish(spot));
      }
    },
    play(timeStamp: number = 0) {
      if (!this.active.demo) {
        console.warn("Cannot play demo with no active demo");
        return;
      }
      const activeSpotIndex = 0;
      let adjustedPosition = timeStamp;
      const isTooLong = false;
      const demo = DemosStore.demos[this.active.demo];
      const spotId = demo.spots![activeSpotIndex];
      const spot = SpotsStore.spots[spotId];
      while (isTooLong) {}
      spot.audio?.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
        runInAction(() => {
          this.setPlaybackPercent(status, spot);
        });
      });
      spot.audio?.playFromPositionAsync(adjustedPosition);
      runInAction(() => {
        this.active.status = PlayState.PLAYING;
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
