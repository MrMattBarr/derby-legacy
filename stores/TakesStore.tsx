import { useLocalObservable } from "mobx-react";
import React from "react";
import { Take } from "types/Take";
import { DB } from "types/apiHelpers";
import { Store, createStoreContext, useThings } from "./Store";

export const TakeStore = Store<Take>;
export const TakesContext = createStoreContext<Take>();

export const TakesStoreProvider = ({ children }: any) => {
  const store = useLocalObservable(() => TakeStore(DB.TAKE));
  return (
    <TakesContext.Provider value={store}>{children}</TakesContext.Provider>
  );
};

export const useTakes = () => {
  return useThings(TakesContext, "useTake");
};
