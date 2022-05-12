import { runInAction, toJS } from "mobx";
import { observer, useLocalObservable } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { fetchSpot, loadSpotAudio, subscribeToUserSpots } from "../api";
import Spot from "../types/Spot";
import useUser from "./UserContext";
type SpotMap = {
  [key: string]: Spot;
};
type SpotsContract = {
  spotIds: string[];
  spots: SpotMap;
  addSpot: (spot: Spot) => void;
  processSpotIds: (spotIds: string[]) => void;
};

const SpotsContext = React.createContext({} as SpotsContract);
export const SpotsProvider = observer(({ children }: any) => {
  const store = useLocalObservable<SpotsContract>(() => ({
    spotIds: [],
    spots: {},
    processSpotIds(spotIds: string[]) {
      console.log({ spotIds });
      spotIds.forEach((id) => fetchSpot(id, this.addSpot));
    },
    addSpot(spot: Spot) {
      console.log({ spot });
      runInAction(() => (this.spots[spot.id] = spot));
      runInAction(() => {
        const spotAlreadyThere = this.spotIds.includes(spot.id);
        if (!spotAlreadyThere) {
          this.spotIds.push(spot.id);
        }
      });
    },
  }));

  const { user } = useUser();
  const userId = toJS(user)?.id;

  useEffect(() => {
    if (userId) {
      subscribeToUserSpots(userId, store.processSpotIds);
    } else {
      runInAction(() => {
        store.spotIds = [];
      });
    }
  }, [userId]);

  return (
    <SpotsContext.Provider value={store}>{children}</SpotsContext.Provider>
  );
});

const useSpots = () => {
  const context = useContext(SpotsContext);
  if (context === undefined) {
    throw new Error("useSpots must be used within a SpotsProvider");
  }
  return context;
};

export default useSpots;
