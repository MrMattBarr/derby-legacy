import { runInAction } from "mobx";
import { observer } from "mobx-react";
import React, { useContext, useEffect, useState } from "react";
import { TEST_ROLES } from "testData/role";
import { Role } from "types/Role";
import { updateDemo, updateSpot } from "../api";
import Loading from "../components/Demo/Loading";
import Page from "../components/Page";
import { useAuth } from "../stores/AuthStore";
import { useDemos } from "../stores/DemosStore";
import { useSpots } from "../stores/SpotsStore";
import { useUsers } from "../stores/UsersStore";
import { Visibility } from "../types/Demo";
import { readableDuration as _readableDuration } from "../utils/utils";

type RoleContract = {
  role?: Role;
};

interface IDemoContext {
  children: React.ReactNode;
  id: string;
}

const RoleContext = React.createContext({} as RoleContract);
export const RoleProvider = observer(({ children, id }: IDemoContext) => {
  const role = TEST_ROLES.find((x) => x.id === id);

  return (
    <RoleContext.Provider
      value={{
        role,
      }}
    >
      {role && children}
      {!role && (
        <Page>
          <Loading />
        </Page>
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
