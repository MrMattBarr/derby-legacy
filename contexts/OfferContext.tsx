import { View } from "components/Themed";
import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { Offer } from "types/Offer";
import Loading from "../components/Demo/Loading";
import { ContextContract, IContext } from "./types";
import { useAuth } from "stores/AuthStore";
import { useRoles } from "stores/RolesStore";
import { ModalKey, useModal } from "./ModalContext";
import useAppNav from "./NavigationContext";
import { NavPage } from "constants/Navigation";
import { useUsers } from "stores/UsersStore";

interface OfferContract extends ContextContract<Offer> {
  isOwner: boolean;
  acceptOffer: () => void;
}

const OfferContext = React.createContext({} as OfferContract);
export const OfferProvider = observer(
  ({ children, id, store }: IContext<Offer>) => {
    const RoleStore = useRoles();
    const authStore = useAuth();
    const userStore = useUsers();
    const roleStore = useRoles();
    const uid = authStore.user?.uid;
    const self = uid ? userStore.users[uid] : undefined;
    const { go } = useAppNav();
    const { setModal } = useModal();

    const thing = store.things[id];
    const isOwner = authStore.user?.uid === thing?.owner;
    useEffect(() => {
      store.load(id);
    }, [store]);

    const roleId = thing?.role;
    useEffect(() => {
      if (roleId) {
        roleStore.load(roleId);
      }
    }, [roleStore, roleId]);

    const role = roleStore.things[roleId];

    useEffect(() => {
      if (roleId) {
        RoleStore.load(roleId);
      }
    }, [roleId]);

    const goSeeRole = () => {
      go(NavPage.ROLES, { id: roleId });
      setModal(ModalKey.NONE);
    };

    useEffect(() => {
      const isTheTalent = role?.talent === self?.id;
      const selfRoles = self?.roles ?? [];
      const hasTheRole = Array.isArray(selfRoles)
        ? selfRoles.includes(roleId)
        : !!(selfRoles ?? {})[roleId] ?? false;
      if (isTheTalent && hasTheRole) {
        goSeeRole();
      }
    }, [role, self, roleId]);

    const acceptOffer = () => {
      if (!self) {
        return;
      }
      const roleUpdate = {
        id: roleId,
        talent: self.id,
      };
      RoleStore.update(roleUpdate);
    };
    return (
      <OfferContext.Provider
        value={{
          element: thing,
          isOwner,
          acceptOffer,
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
