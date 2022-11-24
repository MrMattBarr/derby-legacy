import { action, makeObservable, observable } from "mobx";

import { useLocalObservable } from "mobx-react";
import React, { useContext } from "react";

type IModalStore = {
  modal?: string;
  setModal: (modal?: string) => void;
};

export function ModalStore() {
  return makeObservable<IModalStore>(
    {
      modal: undefined,
      setModal(data?: string) {
        this.modal = data;
      },
    },
    {
      modal: observable,
      setModal: action,
    }
  );
}
export const ModalContext = React.createContext<IModalStore | undefined>(
  undefined
);

export const ModalStoreProvider = ({ children }: any) => {
  const store = useLocalObservable(ModalStore);
  return (
    <ModalContext.Provider value={store}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
};
