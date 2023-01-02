import { action, makeObservable, observable, runInAction } from "mobx";

import { useLocalObservable } from "mobx-react";
import React, { useContext } from "react";
import { fetchDemo, createDemo } from "../api";
import Demo from "../types/Demo";

type IDemosStore = {
  demoIds: string[];
  demos: Record<string, Demo>;
  createDemo: (demo: Partial<Demo>) => Promise<Demo>;
  addDemo: (demo: Demo) => void;
  processDemoIds: (demoIds: string[]) => void;
  loadDemo: (demoId: string) => void;
};

export function DemosStore() {
  return makeObservable<IDemosStore>(
    {
      demos: {},
      demoIds: [],
      processDemoIds(demoIds: string[]) {
        const onFetch = (demo: Demo) =>
          runInAction(() => {
            this.addDemo(demo);
          });
        demoIds.forEach((id) => fetchDemo(id, onFetch));
      },

      addDemo(demo: Demo) {
        this.demos[demo.id] = demo;

        const spotAlreadyThere = this.demoIds.includes(demo.id);
        if (!spotAlreadyThere) {
          this.demoIds.push(demo.id);
        }
      },
      async createDemo(demo: Partial<Demo>) {
        const uploadedDemo = await createDemo(demo);

        runInAction(() => {
          this.addDemo(uploadedDemo);
        });

        return uploadedDemo;
      },
      loadDemo(demoId: string) {
        if (!demoId) {
          throw new Error("Unable to load demo with no ID");
        }
        if (!!this.demos && !this.demos[demoId]) {
          this.processDemoIds([demoId]);
        }
      },
    },
    {
      demos: observable,
      demoIds: observable,
    }
  );
}
export const DemosContext = React.createContext<IDemosStore | undefined>(
  undefined
);

export const DemosStoreProvider = ({ children }: any) => {
  const store = useLocalObservable(DemosStore);
  return (
    <DemosContext.Provider value={store}>{children}</DemosContext.Provider>
  );
};

export const useDemos = () => {
  const context = useContext(DemosContext);
  if (context === undefined) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
};
