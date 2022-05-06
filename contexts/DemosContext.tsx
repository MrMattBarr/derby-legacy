import { runInAction } from "mobx";
import { useLocalObservable } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { deleteDemo, subscribeToUserDemos } from "../api";
import Demo from "../types/Demo";
type DemoMap = {
  [key: string]: Demo;
};
type DemosContract = {
  demoIds: string[];
  deleteDemo: (id: string) => void;
  demos: DemoMap;
};

const DemosContext = React.createContext({} as DemosContract);
export const DemosProvider = ({ children }: any) => {
  const store = useLocalObservable<DemosContract>(() => ({
    demoIds: [],
    demos: {},
    deleteDemo(id: string) {
      runInAction(() => {
        this.demoIds = this.demoIds.filter((x) => x !== id);
      });
      runInAction(() => {
        delete this.demos[id];
      });
      deleteDemo(id);
    },
  }));

  const user = "MrMattBarr";

  const updateDemos = (demos: DemoMap) => {
    if (!demos) {
      return;
    }
    const keys = Object.keys(demos);
    const newKeys = keys.filter((key) => !store.demos[key]);
    keys.forEach((key) => {
      store.demos[key] = demos[key];
    });
    newKeys.forEach((key) => {
      store.demoIds.push(key);
    });
  };

  useEffect(() => {
    subscribeToUserDemos(user, updateDemos);
  }, []);

  return (
    <DemosContext.Provider value={store}>{children}</DemosContext.Provider>
  );
};

const useDemos = () => {
  const context = useContext(DemosContext);
  if (context === undefined) {
    throw new Error("useDemos must be used within a DemosProvider");
  }
  return context;
};

export default useDemos;
