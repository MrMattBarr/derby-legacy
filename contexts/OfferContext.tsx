import { View } from "components/Themed";
import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { Offer } from "types/Offer";
import Loading from "../components/Demo/Loading";
import { ContextContract, IContext } from "./types";
import { useAuth } from "stores/AuthStore";
import { useRoles } from "stores/RolesStore";

interface OfferContract extends ContextContract<Offer> {
  isOwner: boolean;
}

const OfferContext = React.createContext({} as OfferContract);
export const OfferProvider = observer(
  ({ children, id, store }: IContext<Offer>) => {
    const RoleStore = useRoles();
    useEffect(() => {
      store.load(id);
    }, [store]);

    const thing = store.things[id];
    const roleId = thing?.role;

    useEffect(() => {
      if (roleId) {
        RoleStore.load(roleId);
      }
    }, [roleId]);

    const authStore = useAuth();
    const isOwner = authStore.user?.uid === thing?.owner;
    return (
      <OfferContext.Provider
        value={{
          element: thing,
          isOwner,
        }}
      >
        {thing && children}
        {!thing && (
          <View style={{ backgroundColor: "black", padding: 10 }}>
            <Loading />
          </View>
        )}
      </OfferContext.Provider>
    );
  }
);

const useOffer = () => {
  const context = useContext(OfferContext);
  if (context === undefined) {
    throw new Error("useOffer must be used within a OfferPovider");
  }
  return context;
};

export default useOffer;
