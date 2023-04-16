import { View } from "components/Themed";
import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { useRoles } from "stores/RolesStore";
import { Role } from "types/Role";
import Loading from "../components/Demo/Loading";
import { useAuth } from "stores/AuthStore";

type RoleContract = {
  role?: Role;
  isTalent: boolean;
};

interface IDemoContext {
  children: React.ReactNode;
  id: string;
}

const RoleContext = React.createContext({} as RoleContract);
export const RoleProvider = observer(({ children, id }: IDemoContext) => {
  const roleStore = useRoles();
  const authStore = useAuth();
  useEffect(() => {
    roleStore.load(id);
  }, [roleStore]);
  const role = roleStore.things[id];

  const isTalent = role?.talent === authStore.user?.uid;
  return (
    <RoleContext.Provider
      value={{
        role,
        isTalent,
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
