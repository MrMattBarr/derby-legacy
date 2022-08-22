import { AVPlaybackStatus } from "expo-av";
import { useLocalObservable } from "mobx-react";
import React, { useContext } from "react";

export enum PlayState {
  PLAYING = "PLAYING",
  PAUSED = "PAUSED",
  READY = "READY",
}

type Active = {
  demo?: string;
  spot?: string;
  status: PlayState;
  playbackStatus?: AVPlaybackStatus;
};

type PlaybackContract = {
  active: Active;
  play: () => void;
  pause: () => void;
};

const PlaybackContext = React.createContext({} as PlaybackContract);
export const PlaybackProvider = ({ children }: any) => {
  const store = useLocalObservable<PlaybackContract>(() => ({
    active: {
      status: PlayState.PAUSED,
    },
    pause() {},
    play() {},
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
