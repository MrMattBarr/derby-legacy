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
};

const SpotsContext = React.createContext({} as SpotsContract);
export const SpotsProvider = observer(({ children }: any) => {
  const store = useLocalObservable<SpotsContract>(() => ({
    spotIds: [],
    spots: {},
  }));

  const { user } = useUser();
  const userId = toJS(user)?.id;

  const loadInSpot = async (spot: Spot) => {
    runInAction(() => (store.spots[spot.id] = spot));
    runInAction(() => store.spotIds.push(spot.id));
  };
  const processSpotIds = async (spotIds: string[]) => {
    const newSpots = spotIds.filter((x) => !toJS(store.spotIds).includes(x));
    newSpots.forEach((id) => fetchSpot(id, loadInSpot));
  };

  useEffect(() => {
    if (userId) {
      subscribeToUserSpots(userId, processSpotIds);
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
