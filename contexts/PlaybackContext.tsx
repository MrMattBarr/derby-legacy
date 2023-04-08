import { AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { runInAction } from "mobx";
import { useLocalObservable } from "mobx-react";
import React, { useContext } from "react";
import { LoadableSound } from "types/AudioMetadata";
import { useSpots } from "../stores/SpotsStore";
import Demo from "../types/Demo";
import Spot from "../types/Spot";

export enum PlayState {
  PLAYING = "PLAYING",
  PAUSED = "PAUSED",
  READY = "READY",
}

export enum LoadableType {
  DEMO = "demo",
  SPOT = "spot",
  SPOT_ARRAY = "spotArray",
  SOUND = "sound",
}

export type Loadable = Demo | Spot | Spot[] | LoadableSound | LoadableSound[];

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
  audio?: Sound;
  playerId?: number;
  queue: LoadableSound[];
  index: number;
  state: PlayState;
  playbackPercent?: number;
  duration: number;
  loadedElement?: Loadable;
  togglePlay: () => void;
  play: (timeStamp?: number) => void;
  setAudio: (audio: Sound[]) => void;
  unload: () => Promise<void>;
  load: (source: Loadable, options?: LoadOptions) => void;
  loadOrToggle: (source?: Loadable, options?: LoadOptions) => void;
  pause: () => void;
  resume: () => void;
  onFinish: () => void;
  reset: () => void;
  onUpdate: (status: AVPlaybackStatus) => void;
};

export interface LoadOptions {
  autoPlay?: boolean;
  playerId?: number;
}

const PlaybackContext = React.createContext({} as PlaybackContract);
export const PlaybackProvider = ({ children }: any) => {
  const spotsStore = useSpots();

  const spotsToAudioList = (spots: Spot[]) => {
    const sounds = spots
      .filter((x) => x)
      .map((spot) => {
        if (!spot?.audio) {
          throw new Error("Unable to load spots without audio");
        }
        const audio = spot.audio as Sound;
        return { sound: audio, metadata: spot.metadata };
      });
    return sounds;
  };

  const spotIdsToAudioList = (ids: string[]) => {
    const spots = ids.map((id) => spotsStore.things[id]);
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
          this.audio = this.queue[nextIndex].sound;
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
          this.state = PlayState.READY;
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
    loadOrToggle(source?: Loadable, options?: LoadOptions) {
      if ((options?.playerId ?? -1) === this.playerId) {
        this.togglePlay();
      } else if (source) {
        this.load(source, options);
      }
    },
    resume() {
      runInAction(() => {
        this.audio?.playAsync();
        this.state = PlayState.PLAYING;
      });
    },
    setAudio(audio: Sound[]) {
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
    async load(source: Loadable, options?: LoadOptions) {
      let sounds: LoadableSound[] = [];

      if ((source as Demo).spots) {
        const demo = source as Demo;
        if (!demo.spots) {
          throw new Error("Unable to load demo with no spots");
        }
        sounds = spotIdsToAudioList(demo.spots);
      } else if ((source as Spot).author) {
        sounds = spotsToAudioList([source as Spot]);
      } else if ((source as LoadableSound).sound) {
        sounds = [source as LoadableSound] as LoadableSound[];
      } else if (Array.isArray(source)) {
        const first = source[0];
        if ((first as Spot).author) {
          sounds = spotsToAudioList(source as Spot[]);
        } else {
          sounds = source as LoadableSound[];
        }
      }
      await this.unload();
      runInAction(() => {
        this.loadedElement = source;
        this.playerId = options?.playerId;
        this.queue = sounds;
        this.duration = sounds.reduce(
          (current, { metadata: { duration } }) => current + duration,
          0
        );
        if (options?.autoPlay !== false) {
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
        playedMs += this.queue[previouslyPlayed].metadata.duration;
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
        this.audio = this.queue[activeSpotIndex].sound;
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
