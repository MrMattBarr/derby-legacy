import { runInAction, toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { updateDemo } from "../api";
import Loading from "../components/Demo/Loading";
import Page from "../components/Page";
import { useAuth } from "../stores/AuthStore";
import { useDemos } from "../stores/DemosStore";
import { useUsers } from "../stores/UsersStore";
import Demo, { Visibility } from "../types/Demo";

interface DemoUpdate {
  field: "title" | "summary";
  value: string;
}
type DemoStore = {
  demo?: Demo;
  isOwner: boolean;
  setVisibility: (visibility: Visibility) => void;
  update: (update: DemoUpdate) => void;
  toggleSpot: (spotId: string) => void;
};

interface IDemoContext {
  children: React.ReactNode;
  id: string;
}

const DemoContext = React.createContext({} as DemoStore);
export const DemoProvider = observer(({ children, id }: IDemoContext) => {
  const demoStore = useDemos();
  const users = useUsers();

  useEffect(() => {
    demoStore.loadDemo(id);
  }, [demoStore]);

  const demo = demoStore.demos[id];

  useEffect(() => {
    if (demo?.userId) {
      users.loadUser(demo.userId);
    }
  }, [demo?.userId]);

  const update = ({ field, value }: DemoUpdate) => {
    runInAction(() => {
      demo[field] = value;
      updateDemo(demo);
    });
  };
  const setVisibility = (visibility: Visibility) => {
    runInAction(() => {
      demo.visibility = visibility;
      updateDemo(demo);
    });
  };
  const toggleSpot = (spotId: string) => {
    runInAction(() => {
      const spots = demo.spots ?? [];
      if (spots.includes(spotId)) {
        demo.spots = spots.filter((x) => x !== spotId);
      } else {
        demo.spots = [...spots, spotId];
      }
      updateDemo(demo);
    });
  };

  const authStore = useAuth();
  const { user } = authStore;
  const isOwner = demo?.userId === user?.uid && !!demo?.userId;
  const demos = toJS(demoStore.demos);
  console.log({ fish: demoStore.demos, demo, id, demos });
  return (
    <DemoContext.Provider
      value={{ demo, isOwner, update, toggleSpot, setVisibility }}
    >
      {demo && children}
      {!demo && (
        <Page>
          <Loading />
        </Page>
      )}
    </DemoContext.Provider>
  );
});

const useDemo = () => {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
};

export default useDemo;
