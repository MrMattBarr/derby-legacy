import { makeAutoObservable } from "mobx";
import React, { createContext, useContext } from "react";
import { fetchDemo } from "../api";
import Demo from "../types/Demo";
type DemoMap = {
  [key: string]: Demo;
};

class DemosStore {
  demoIds: string[] = [];
  demos: DemoMap = {};

  constructor() {
    makeAutoObservable(this);
  }

  addDemo(demo: Demo) {
    this.demos[demo.id] = demo;

    const spotAlreadyThere = this.demoIds.includes(demo.id);
    if (!spotAlreadyThere) {
      this.demoIds.push(demo.id);
    }
  }

  processDemoIds(demoIds: string[]) {
    console.log({ demoIds });
    demoIds.forEach((id) => fetchDemo(id, this.addDemo.bind(this)));
  }

  loadDemo(demoId: string) {
    if (!demoId) {
      throw new Error("Unable to load demo with no ID");
    }
    if (!this.demos[demoId]) {
      this.processDemoIds([demoId]);
    }
  }
}

//@ts-ignore
export const DemosContext = createContext<DemosStore>();

export const DemosProvider = ({ children }: any) => {
  console.log("rendering provider");
  return (
    <DemosContext.Provider value={new DemosStore()}>
      {children}
    </DemosContext.Provider>
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
