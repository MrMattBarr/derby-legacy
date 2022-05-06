import { useLocalObservable } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { loadSpotAudio, subscribeToUserSpots } from "../api";
import Spot from "../types/Spot";
type SpotMap = {
  [key: string]: Spot;
};
type SpotsContract = {
  spotIds: string[];
  spots: SpotMap;
};

const SpotsContext = React.createContext({} as SpotsContract);
export const SpotsProvider = ({ children }: any) => {
  const store = useLocalObservable<SpotsContract>(() => ({
    spotIds: [],
    spots: {},
  }));

  const user = "MrMattBarr";

  const updateSpots = async (spots: SpotMap) => {
    if (!spots) {
      return;
    }
    const keys = Object.keys(spots);
    const newKeys = keys.filter((key) => !store.spots[key]);
    keys.forEach(async (key) => {
      const spot: Spot = spots[key];
      spot.id = key;
      spot.audio = await loadSpotAudio(key);
      store.spots[key] = spots[key];
    });
    newKeys.forEach((key) => {
      store.spotIds.push(key);
    });
  };

  useEffect(() => {
    subscribeToUserSpots(user, updateSpots);
  }, []);

  return (
    <SpotsContext.Provider value={store}>{children}</SpotsContext.Provider>
  );
};

const useSpots = () => {
  const context = useContext(SpotsContext);
  if (context === undefined) {
    throw new Error("useSpots must be used within a SpotsProvider");
  }
  return context;
};

export default useSpots;
