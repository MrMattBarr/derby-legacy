import { makeObservable, observable, runInAction } from "mobx";

import { useLocalObservable } from "mobx-react";
import React, { useContext } from "react";
import { createTake, deleteTake, fetchTake } from "../api";
import { Take } from "types/Take";
import { Recording } from "expo-av/build/Audio";

type TakesStoreContract = {
  takeIds: string[];
  takes: Record<string, Take>;
  addTake: (take: Take) => void;
  createTake: (take: Partial<Take>, recording: Recording) => Promise<Take>;
  processIds: (takeIds: string[], onError?: (id: string) => void) => void;
  loadTake: (takeId: string) => void;
  deleteTake: (take: Take) => void;
};

export function TakesStore() {
  return makeObservable<TakesStoreContract>(
    {
      takes: {},
      takeIds: [],
      processIds(takeIds: string[], onError?: (id: string) => void) {
        const onFetch = (take: Take) =>
          runInAction(() => {
            this.addTake(take);
          });
        takeIds.forEach((id) => fetchTake({ id, onFetch }));
      },

      addTake(take: Take) {
        this.takes[take.id] = take;

        const takeAlreadyThere = this.takeIds.includes(take.id);
        if (!takeAlreadyThere) {
          this.takeIds.push(take.id);
        }
      },
      async createTake(take: Partial<Take>, recording: Recording) {
        const uploadedTake = (await createTake({ take, recording })) as any;

        runInAction(() => {
          this.addTake(uploadedTake);
        });

        return uploadedTake;
      },
      deleteTake(take: Take) {
        runInAction(() => {
          delete this.takes[take.id];
          this.takeIds = this.takeIds.filter((x) => x !== take.id);
        });
        deleteTake(take.id);
      },
      loadTake(takeId: string) {
        if (!takeId) {
          throw new Error("Unable to load take with no ID");
        }
        if (!!this.takes && !this.takes[takeId]) {
          this.processIds([takeId]);
        }
      },
    },
    {
      takes: observable,
      takeIds: observable,
    }
  );
}
export const TakesContext = React.createContext<TakesStoreContract | undefined>(
  undefined
);

export const TakesStoreProvider = ({ children }: any) => {
  const store = useLocalObservable(TakesStore);
  return (
    <TakesContext.Provider value={store}>{children}</TakesContext.Provider>
  );
};

export const useTakes = () => {
  const context = useContext(TakesContext);
  if (context === undefined) {
    throw new Error("useTake must be used within a TakeProvider");
  }
  return context;
};
