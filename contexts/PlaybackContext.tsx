import { AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { runInAction } from "mobx";
import { useLocalObservable } from "mobx-react";
import React, { useContext } from "react";
import { useSpots } from "../stores/SpotsStore";
import Demo from "../types/Demo";
import Spot from "../types/Spot";

export enum PlayState {
  PLAYING = "PLAYING",
  PAUSED = "PAUSED",
  READY = "READY",
}

export interface SoundWithDuration extends Sound {
  duration: number;
}

export enum LoadableType {
  DEMO = "demo",
  SPOT = "spot",
  SPOT_ARRAY = "spotArray",
  SOUND = "sound",
}

type Loadable = Demo | Spot | Spot[] | SoundWithDuration | SoundWithDuration[];

export const getLoadableType = (source?: Loadable) => {
  if (!source) {
    return undefined;
  }
  if ((source as Demo).userId) {
    return LoadableType.DEMO;
  } else if ((source as Spot).author) {
    return LoadableType.SPOT;
  } else if (Array.isArray(source)) {
    if ((source[0] as Spot).author) {
      return LoadableType.SPOT_ARRAY;
    }
  }
};

type PlaybackContract = {
  audio?: SoundWithDuration;
  queue: SoundWithDuration[];
  index: number;
  state: PlayState;
  playbackPercent?: number;
  duration: number;
  loadedElement?: Loadable;
  togglePlay: () => void;
  play: (timeStamp?: number) => void;
  setAudio: (audio: SoundWithDuration[]) => void;
  unload: () => Promise<void>;
  load: (source: Loadable, options?: LoadOptions) => void;
  pause: () => void;
  resume: () => void;
  onFinish: () => void;
  reset: () => void;
  onUpdate: (status: AVPlaybackStatus) => void;
};

export interface LoadOptions {
  autoPlay: boolean;
}

const PlaybackContext = React.createContext({} as PlaybackContract);
export const PlaybackProvider = ({ children }: any) => {
  const SpotsStore = useSpots();

  const spotsToAudioList = (spots: Spot[]) => {
    const sounds = spots
      .filter((x) => x)
      .map((spot) => {
        if (!spot?.audio) {
          throw new Error("Unable to load spots without audio");
        }
        const audio = spot.audio as SoundWithDuration;
        audio.duration = spot.length;
        return audio;
      });
    return sounds;
  };

  const spotIdsToAudioList = (ids: string[]) => {
    const spots = ids.map((id) => SpotsStore.spots[id]);
    return spotsToAudioList(spots);
  };

  const store = useLocalObservable<PlaybackContract>(() => ({
    playbackPercent: 0,
    state: PlayState.READY,
    duration: 0,
    queue: [],
    index: 0,
    pause() {
      runInAction(() => {
        this.audio?.pauseAsync();
        this.state = PlayState.PAUSED;
      });
    },
    onFinish() {
      const nextIndex = this.index + 1;
      if (nextIndex < this.queue.length) {
        runInAction(async () => {
          this.index = nextIndex;
          this.audio = this.queue[nextIndex];
          await this.audio?.setOnPlaybackStatusUpdate(
            (status: AVPlaybackStatus) => {
              runInAction(() => {
                this.onUpdate(status);
              });
            }
          );
          await this.audio?.setProgressUpdateIntervalAsync(25);
          await this.audio?.playFromPositionAsync(0);
        });
      } else {
        runInAction(async () => {
          this.unload();
        });
      }
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
    setAudio(audio: SoundWithDuration[]) {
      runInAction(() => {
        this.audio = audio[0];
        this.playbackPercent = 0;
      });
    },
    async unload() {
      if (this.audio) {
        await this.audio.stopAsync();
        runInAction(() => {
          this.audio = undefined;
          this.playbackPercent = 0;
          this.index = 0;
          this.duration = 0;
          this.queue = [];
          this.loadedElement = undefined;
          this.state = PlayState.READY;
        });
      }
    },
    load(source: Loadable, options?: LoadOptions) {
      let sounds: SoundWithDuration[] = [];

      if ((source as Demo).spots) {
        const demo = source as Demo;
        if (!demo.spots) {
          throw new Error("Unable to load demo with no spots");
        }
        sounds = spotIdsToAudioList(demo.spots);
      } else if ((source as Spot).author) {
        sounds = spotsToAudioList([source as Spot]);
      } else if ((source as SoundWithDuration)._coalesceStatusUpdatesInMillis) {
        sounds = [source] as SoundWithDuration[];
      } else if (Array.isArray(source)) {
        const first = source[0];
        if ((first as Spot).author) {
          sounds = spotsToAudioList(source as Spot[]);
        } else {
          sounds = source as SoundWithDuration[];
        }
      }
      runInAction(async () => {
        await this.unload();
        this.loadedElement = source;
        this.queue = sounds;
        this.duration = sounds.reduce(
          (current, { duration }) => current + duration,
          0
        );
        console.log({ options, gralse: options?.autoPlay !== false });
        if (options?.autoPlay !== false) {
          console.log("autoplaying");
          this.play();
        }
      });
    },
    onUpdate(status: AVPlaybackStatus) {
      const { positionMillis, durationMillis } =
        status as AVPlaybackStatusSuccess;

      let playedMs = positionMillis;
      let previouslyPlayed = 0;

      while (previouslyPlayed < this.index) {
        playedMs += this.queue[previouslyPlayed].duration;
        previouslyPlayed++;
      }

      const percent = playedMs / this.duration;
      const finishedSpot = durationMillis === positionMillis;
      runInAction(() => {
        this.playbackPercent = percent;
      });
      if (finishedSpot) {
        runInAction(() => this.onFinish());
      }
    },
    async play(timeStamp?: number) {
      const activeSpotIndex = 0;
      let adjustedPosition = timeStamp ?? 0;

      runInAction(async () => {
        this.audio = this.queue[activeSpotIndex];
        await this.audio?.setOnPlaybackStatusUpdate(
          (status: AVPlaybackStatus) => {
            runInAction(() => {
              this.onUpdate(status);
            });
          }
        );
        await this.audio?.setProgressUpdateIntervalAsync(25);
        this.state = PlayState.PLAYING;
        await this.audio?.playFromPositionAsync(adjustedPosition);
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
