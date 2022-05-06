import { useLinkTo } from "@react-navigation/native";
import { observable } from "mobx";
import { useLocalObservable } from "mobx-react";
import React, { useContext } from "react";
import { uploadDemo } from "../api";
import Demo from "../types/Demo";
import { randomId } from "../utils";

type DemoStore = {
  spotIds: string[];
  removeSpot: (spotId: string) => boolean;
  addSpot: (spotId: string) => boolean;
  saveDemo: () => void;
};

const DemoContext = React.createContext({} as DemoStore);
export const DemoProvider = ({ children }: any) => {
  const linkTo = useLinkTo();
  const store = useLocalObservable(() => ({
    spotIds: observable<string>([]),
    removeSpot(id: string) {
      this.spotIds.replace(this.spotIds.filter((x) => x !== id));
      return true;
    },
    addSpot(id: string) {
      this.spotIds.push(id);
      return true;
    },
    saveDemo() {
      const demoNum = Math.floor(Math.random() * 100) + 1;
      const demoName = `Demo #${demoNum}`;
      const demo: Demo = {
        id: randomId(),
        title: demoName,
        uploadDate: new Date(),
        userId: "MrMattBarr",
        spots: this.spotIds,
      };
      uploadDemo(demo);
      linkTo(`/demos`);
    },
  }));

  return <DemoContext.Provider value={store}>{children}</DemoContext.Provider>;
};

const useDemo = () => {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
};

export default useDemo;
