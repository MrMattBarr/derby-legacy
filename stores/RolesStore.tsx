import { useLocalObservable } from "mobx-react";
import React from "react";
import { Role } from "types/Role";
import { DB } from "types/apiHelpers";
import { Store, createStoreContext, useThings } from "./Store";

export const RoleStore = Store<Role>;
export const RolesContext = createStoreContext<Role>();

export const RolesStoreProvider = ({ children }: any) => {
  const store = useLocalObservable(() => RoleStore(DB.ROLE));
  return (
    <RolesContext.Provider value={store}>{children}</RolesContext.Provider>
  );
};

export const useRoles = () => {
  return useThings(RolesContext, "useRole");
};
