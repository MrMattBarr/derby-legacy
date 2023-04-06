import { makeObservable, observable, runInAction } from "mobx";

import { Recording } from "expo-av/build/Audio";
import React, { createContext, useContext } from "react";
import { DB } from "types/apiHelpers";
import {
  ThingWithId,
  createThing,
  deleteThing,
  fetchThing,
  updateThing,
} from "../api";

export type StoreContract<Thing extends ThingWithId> = {
  ids: Set<string>;
  things: Record<string, Thing>;
  add: (thing: Thing) => void;
  create: (thing: Partial<Thing>, recording?: Recording) => Promise<Thing>;
  processIds: (ids: string[], onError?: (id: string) => void) => void;
  update: (thing: Partial<Thing>) => void;
  load: (id: string) => void;
  delete: (id: string) => void;
};

export function Store<Thing extends ThingWithId>(db: DB) {
  return makeObservable<StoreContract<Thing>>(
    {
      things: {},
      ids: new Set<string>(),
      processIds(ids: string[], onError?: (id: string) => void) {
        const onFetch = (thing: Thing) =>
          runInAction(() => {
            this.add(thing);
          });
        ids.forEach((id) => fetchThing({ id, onFetch, db }));
      },

      add(thing: Thing) {
        this.things[thing.id] = thing;
        this.ids.add(thing.id);
      },
      async create(thing: Partial<Thing>, recording?: Recording) {
        const uploadedThing = (await createThing({
          thing,
          db,
          recording,
        })) as any;

        runInAction(() => {
          this.add(uploadedThing);
        });

        return uploadedThing;
      },
      delete(id: string) {
        runInAction(() => {
          delete this.things[id];
          this.ids.delete(id);
        });
        deleteThing({ id, db });
      },
      update(thing: Partial<Thing>) {
        updateThing({ thing, db });
      },
      load(id: string) {
        if (!id) {
          throw new Error("Unable to load element with no ID");
        }
        if (!!this.things && !this.things[id]) {
          this.processIds([id]);
        }
      },
    },
    {
      things: observable,
      ids: observable,
    }
  );
}

export function createStoreContext<Thing extends ThingWithId>() {
  return createContext<StoreContract<Thing> | undefined>(undefined);
}

export function useThings<Type extends ThingWithId>(
  Context: React.Context<StoreContract<Type> | undefined>,
  name: string
) {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error(`${name} must be used within a relevant provider`);
  }
  return context;
}
