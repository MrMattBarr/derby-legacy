import { useLocalObservable } from "mobx-react";
import React from "react";
import { Offer } from "types/Offer";
import { DB } from "types/apiHelpers";
import { Store, createStoreContext, useThings } from "./Store";

export const OfferStore = Store<Offer>;
export const OffersContext = createStoreContext<Offer>();

export const OffersStoreProvider = ({ children }: any) => {
  const store = useLocalObservable(() => OfferStore(DB.OFFER));
  return (
    <OffersContext.Provider value={store}>{children}</OffersContext.Provider>
  );
};

export const useOffers = () => {
  return useThings(OffersContext, "useOffer");
};
