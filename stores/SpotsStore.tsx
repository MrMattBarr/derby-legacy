import { makeObservable, observable, runInAction } from "mobx";

import { useLocalObservable } from "mobx-react";
import React, { useContext } from "react";
import { createSpot, deleteSpot, fetchSpot } from "../api";
import Spot from "../types/Spot";
import { Recording } from "expo-av/build/Audio";

type ISpotsStore = {
  spotIds: string[];
  spots: Record<string, Spot>;
  addSpot: (spot: Spot) => void;
  createSpot: (spot: Partial<Spot>, recording: Recording) => Promise<Spot>;
  processSpotIds: (spotIds: string[], onError?: (id: string) => void) => void;
  loadSpot: (spotId: string) => void;
  deleteSpot: (spot: Spot) => void;
};

export function SpotsStore() {
  return makeObservable<ISpotsStore>(
    {
      spots: {},
      spotIds: [],
      processSpotIds(spotIds: string[], onError?: (id: string) => void) {
        const onFetch = (spot: Spot) =>
          runInAction(() => {
            this.addSpot(spot);
          });
        spotIds.forEach((id) => fetchSpot(id, onFetch, onError));
      },

      addSpot(spot: Spot) {
        this.spots[spot.id] = spot;

        const spotAlreadyThere = this.spotIds.includes(spot.id);
        if (!spotAlreadyThere) {
          this.spotIds.push(spot.id);
        }
      },
      async createSpot(spot: Partial<Spot>, recording: Recording) {
        const uploadedSpot = await createSpot(spot, recording);

        runInAction(() => {
          this.addSpot(uploadedSpot);
        });

        return uploadedSpot;
        return spot as Spot;
      },
      deleteSpot(spot: Spot) {
        runInAction(() => {
          delete this.spots[spot.id];
          this.spotIds = this.spotIds.filter((x) => x !== spot.id);
        });
        deleteSpot(spot);
      },
      loadSpot(spotId: string) {
        if (!spotId) {
          throw new Error("Unable to load spot with no ID");
        }
        if (!!this.spots && !this.spots[spotId]) {
          this.processSpotIds([spotId]);
        }
      },
    },
    {
      spots: observable,
      spotIds: observable,
    }
  );
}
export const SpotsContext = React.createContext<ISpotsStore | undefined>(
  undefined
);

export const SpotsStoreProvider = ({ children }: any) => {
  const store = useLocalObservable(SpotsStore);
  return (
    <SpotsContext.Provider value={store}>{children}</SpotsContext.Provider>
  );
};

export const useSpots = () => {
  const context = useContext(SpotsContext);
  if (context === undefined) {
    throw new Error("useSpot must be used within a SpotProvider");
  }
  return context;
};
