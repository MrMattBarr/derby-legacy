import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { useTakes } from "stores/TakesStore";
import { Take } from "types/Take";
import Loading from "../components/Demo/Loading";

type TakeContract = {
  take?: Take;
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
  return (
    <TakeContext.Provider
      value={{
        take,
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
