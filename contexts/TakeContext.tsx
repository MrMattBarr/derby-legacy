import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { useTakes } from "stores/TakesStore";
import { ApprovalStatus, Take } from "types/Take";
import Loading from "../components/Demo/Loading";
import useProject from "./ProjectContext";

type TakeContract = {
  take?: Take;
  markHeard: () => void;
};

interface ITakeContext {
  children: React.ReactNode;
  id: string;
}

const TakeContext = React.createContext({} as TakeContract);

export const TakeProvider = observer(({ children, id }: ITakeContext) => {
  const takeStore = useTakes();
  useEffect(() => {
    takeStore.load(id);
  }, [takeStore]);
  const take = takeStore.things[id];

  const { isOwner } = useProject();
  const isUnheard = take?.status === ApprovalStatus.UNHEARD;

  const markHeard = () => {
    if (isOwner && isUnheard) {
      takeStore.update({ id, status: ApprovalStatus.HEARD });
    }
  };

  return (
    <TakeContext.Provider
      value={{
        take,
        markHeard,
      }}
    >
      {take && children}
      {!take && <Loading text={`Take: "${id}"`} />}
    </TakeContext.Provider>
  );
});

const useTake = () => {
  const context = useContext(TakeContext);
  if (context === undefined) {
    throw new Error("useTake must be used within a TakeProvider");
  }
  return context;
};

export default useTake;
