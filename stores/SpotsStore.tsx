import { useLocalObservable } from "mobx-react";
import React from "react";
import { Spot } from "types/Spot";
import { DB } from "types/apiHelpers";
import { Store, createStoreContext, useThings } from "./Store";

export const SpotStore = Store<Spot>;
export const SpotsContext = createStoreContext<Spot>();

export const SpotsStoreProvider = ({ children }: any) => {
  const store = useLocalObservable(() => SpotStore(DB.SPOT));
  return (
    <SpotsContext.Provider value={store}>{children}</SpotsContext.Provider>
  );
};

export const useSpots = () => {
  return useThings(SpotsContext, "useSpot");
};
