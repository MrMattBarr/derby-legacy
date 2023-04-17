import { View } from "components/Themed";
import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { useAuth } from "stores/AuthStore";
import { useLines } from "stores/LinesStore";
import { useRoles } from "stores/RolesStore";
import { Role } from "types/Role";
import Loading from "../components/Demo/Loading";
import { Line } from "types/Line";

type RoleContract = {
  role?: Role;
  isTalent: boolean;
  lines: Line[];
};

interface IRoleContext {
  children: React.ReactNode;
  id: string;
}

const RoleContext = React.createContext({} as RoleContract);
export const RoleProvider = observer(({ children, id }: IRoleContext) => {
  const roleStore = useRoles();
  const authStore = useAuth();
  const lineStore = useLines();

  const role = roleStore.things[id];
  useEffect(() => {
    roleStore.load(id);
  }, [roleStore]);

  const lineIds = role?.lines ?? [];

  const fullyLoad = () => {
    lineIds.map((line) => lineStore.load(line));
  };

  useEffect(() => {
    fullyLoad();
  }, [lineIds]);

  const lines = lineIds.map((id) => lineStore.things[id]);

  const isTalent = role?.talent === authStore.user?.uid;
  return (
    <RoleContext.Provider
      value={{
        role,
        isTalent,
        lines,
      }}
    >
      {role && children}
      {!role && (
        <View style={{ backgroundColor: "black", padding: 10 }}>
          <Loading />
        </View>
      )}
    </RoleContext.Provider>
  );
});

const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};

export default useRole;
