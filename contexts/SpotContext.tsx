import { runInAction } from "mobx";
import { observer } from "mobx-react";
import React, { useContext, useEffect, useState } from "react";
import { updateDemo, updateSpot } from "../api";
import Loading from "../components/Demo/Loading";
import Page from "../components/Page";
import { useAuth } from "../stores/AuthStore";
import { useSpots } from "../stores/SpotsStore";
import { useUsers } from "../stores/UsersStore";
import { Visibility } from "../types/Demo";
import Spot from "../types/Spot";
import { readableDuration as _readableDuration } from "../utils/utils";

interface SpotUpdate {
  field: "title" | "transcript";
  value: string;
}

type SpotContract = {
  spot?: Spot;
  isOwner: boolean;
  setVisibility: (visibility: Visibility) => void;
  update: (update: SpotUpdate) => void;
};

interface ISpotContext {
  children: React.ReactNode;
  id: string;
}

const SpotContext = React.createContext<SpotContract | undefined>(undefined);
export const SpotProvider = observer(({ children, id }: ISpotContext) => {
  const spotsStore = useSpots();
  const users = useUsers();

  const [duration, setDuration] = useState<number | undefined>();
  useEffect(() => {
    spotsStore.loadSpot(id);
  }, [spotsStore]);

  const spot = spotsStore.spots[id];

  useEffect(() => {
    if (spot?.author) {
      users.loadUser(spot.author);
    }
  }, [spot?.author]);

  const update = ({ field, value }: SpotUpdate) => {
    runInAction(() => {
      spot[field] = value;
      updateSpot(spot);
    });
  };
  const setVisibility = (visibility: Visibility) => {
    runInAction(() => {
      spot.visibility = visibility;
      updateSpot(spot);
    });
  };

  const authStore = useAuth();
  const { user } = authStore;
  const isOwner = spot?.author === user?.uid && !!spot?.author;

  const readableDuration = _readableDuration(duration);

  return (
    <SpotContext.Provider
      value={{
        spot,
        isOwner,
        update,
        setVisibility,
      }}
    >
      {spot && children}
      {!spot && (
        <Page>
          <Loading />
        </Page>
      )}
    </SpotContext.Provider>
  );
});

const useSpot = () => {
  const context = useContext(SpotContext);
  if (context === undefined) {
    throw new Error("useSpot must be used within a SpotProvider");
  }
  return context;
};

export default useSpot;
