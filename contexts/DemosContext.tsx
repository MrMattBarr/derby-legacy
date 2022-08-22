import { makeAutoObservable, runInAction, toJS } from "mobx";
import { useLocalObservable } from "mobx-react";
import { observer, useLocalStore } from "mobx-react-lite";
import React, { createContext, useContext, useEffect } from "react";
import { deleteDemo, fetchDemo, subscribeToUserDemos } from "../api";
import Demo from "../types/Demo";
import useUser from "./UserContext";
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
    demoIds.forEach((id) => fetchDemo(id, this.addDemo.bind(this)));
  }

  loadDemo(demoId: string) {
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

// const DemosContext = React.createContext({} as DemosContract);
// export const DemosProvider = observer(({ children }: any) => {
//   const bStore = useLocalStore(() => new DemosStore()),
//     { length, demoIds } = bStore;
//   const { user } = useUser();
//   const store = useLocalObservable<DemosContract>(() => ({
//     demoIds: [],
//     demos: {},
//     deleteDemo(id: string) {
//       runInAction(() => {
//         this.demoIds = this.demoIds.filter((x) => x !== id);
//       });
//       runInAction(() => {
//         delete this.demos[id];
//       });
//       deleteDemo(id);
//     },
//     processDemoIds(demoIds: string[]) {
//       demoIds.forEach((id) => fetchDemo(id, this.addDemo));
//     },
//     loadDemo(demoId: string) {
//       if (!this.demos[demoId]) {
//         this.processDemoIds([demoId]);
//       }
//     },
//     length: 13,
//     addDemo(demo: Demo) {
//       runInAction(() => (this.demos[demo.id] = demo));
//       runInAction(() => {
//         const spotAlreadyThere = this.demoIds.includes(demo.id);
//         if (!spotAlreadyThere) {
//           this.demoIds.push(demo.id);
//         }
//       });
//     },
//   }));

//   const updateDemos = (demos: DemoMap) => {
//     if (!demos) {
//       return;
//     }
//     const keys = Object.keys(demos);
//     const newKeys = keys.filter((key) => !store.demos[key]);
//     keys.forEach((key) => {
//       store.demos[key] = demos[key];
//     });
//     newKeys.forEach((key) => {
//       store.demoIds.push(key);
//     });
//   };

//   const userId = toJS(user)?.id;

//   useEffect(() => {
//     if (userId) {
//       subscribeToUserDemos(userId, store.processDemoIds);
//     } else {
//       runInAction(() => {
//         store.demoIds = [];
//       });
//     }
//   }, [userId]);

//   return (
//     <DemosContext.Provider value={new DemosStore()}>
//       {children}
//     </DemosContext.Provider>
//   );
// });
