import { runInAction, toJS } from "mobx";
import { useLocalObservable } from "mobx-react";
import React, { useContext } from "react";
import Demo from "../types/Demo";
import Spot from "../types/Spot";
import useDemos from "./DemosContext";
import useSpots from "./SpotsContext";

type IdType = {
  id: string;
  type: string;
};
type OverlayContract = {
  focused?: IdType;
  playing?: IdType;
  focus: (idType: IdType | undefined) => void;
  play: (idType: IdType | undefined) => void;
};

const OverlayContext = React.createContext({} as OverlayContract);
export const OverlayProvider = ({ children }: any) => {
  const { spots } = useSpots();
  const { demos } = useDemos();
  const store = useLocalObservable<OverlayContract>(() => ({
    focused: undefined,
    playing: undefined,
    focus(idType: IdType | undefined = undefined) {
      runInAction(() => {
        this.focused = idType;
      });
    },
    async play(idType: IdType | undefined) {
      console.log("play time");
      if (idType?.type === "SPOT") {
        const alreadyPlayingSpot = toJS(spots)[this.playing?.id ?? 0];
        const newSpot = toJS(spots)[idType.id];
        const status = await alreadyPlayingSpot?.audio?.getStatusAsync();
        console.log({ newSpot, status });
        if (!alreadyPlayingSpot) {
          newSpot.audio?.playAsync();
        }
        if (status?.isLoaded) {
          console.log({ status });
          if (status.isPlaying) {
            console.log("lets pause");
            alreadyPlayingSpot.audio!.pauseAsync();
          }
          console.log("lets play");
          if (idType.id !== alreadyPlayingSpot?.id) {
            newSpot.audio?.playAsync();
          }
        }
      }
      runInAction(() => (this.playing = idType));
    },
  }));

  return (
    <OverlayContext.Provider value={store}>{children}</OverlayContext.Provider>
  );
};

const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (context === undefined) {
    throw new Error("useOverlay must be used within a OverlayProvider");
  }
  return context;
};

export default useOverlay;
