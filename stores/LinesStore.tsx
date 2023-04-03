import { useLocalObservable } from "mobx-react";
import React from "react";
import { Line } from "types/Line";
import { DB } from "types/apiHelpers";
import { Store, createStoreContext, useThings } from "./Store";

export const LineStore = Store<Line>;
export const LinesContext = createStoreContext<Line>();

export const LinesStoreProvider = ({ children }: any) => {
  const store = useLocalObservable(() => LineStore(DB.LINE));
  return (
    <LinesContext.Provider value={store}>{children}</LinesContext.Provider>
  );
};

export const useLines = () => {
  return useThings(LinesContext, "useLine");
};
