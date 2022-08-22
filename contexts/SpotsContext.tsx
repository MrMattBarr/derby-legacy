import { makeAutoObservable } from "mobx";
import React, { createContext, useContext } from "react";
import { fetchSpot } from "../api";
import Spot from "../types/Spot";
type SpotMap = {
  [key: string]: Spot;
};

class SpotsStore {
  spotIds: string[] = [];
  spots: SpotMap = {};

  constructor() {
    makeAutoObservable(this);
  }

  addSpot(spot: Spot) {
    this.spots[spot.id] = spot;

    const spotAlreadyThere = this.spotIds.includes(spot.id);
    if (!spotAlreadyThere) {
      this.spotIds.push(spot.id);
    }
  }

  processSpotIds(spotIds: string[]) {
    spotIds.forEach((id) => fetchSpot(id, this.addSpot.bind(this)));
  }

  loadSpot(spotId: string) {
    if (!this.spots[spotId]) {
      this.processSpotIds([spotId]);
    }
  }
}

//@ts-ignore
export const SpotsContext = createContext<SpotsStore>();

export const SpotsProvider = ({ children }: any) => {
  return (
    <SpotsContext.Provider value={new SpotsStore()}>
      {children}
    </SpotsContext.Provider>
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
