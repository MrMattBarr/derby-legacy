import { useLinkTo } from "@react-navigation/native";
import { observable } from "mobx";
import { observer, useLocalObservable } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { uploadDemo } from "../api";
import { useAuth } from "../stores/AuthStore";
import { useUsers } from "../stores/UsersStore";
import Demo from "../types/Demo";
import { randomId } from "../utils";
import useDemos from "./DemosContext";

type DemoStore = {
  demo?: Demo;
  isOwner: boolean;
};

const DemoContext = React.createContext({} as DemoStore);
export const DemoProvider = observer(({ children, id }: any) => {
  const demos = useDemos();
  const users = useUsers();
  useEffect(() => {
    demos.loadDemo(id);
  }, [demos]);

  const demo = demos.demos[id];

  useEffect(() => {
    if (demo?.userId) {
      users.loadUser(demo.userId);
    }
  }, [demo?.userId]);

  const authStore = useAuth();
  const { user } = authStore;
  const isOwner = demo?.userId === user?.uid && !!demo?.userId;

  return (
    <DemoContext.Provider value={{ demo, isOwner }}>
      {children}
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
