import { observer } from "mobx-react";
import React, { useContext, useEffect, useState } from "react";
export enum ModalKey {
  RECORDING = "recording",
  SPOT_EDITOR = "spotEditor",
  AVATAR_UPLOAD = "avatarUpload",
  OFFER = "offer",
  SCRIPT_PARSER = "scriptParser",
  NONE = "none",
}
interface ModalArgs {
  spotId: string;
  offerId: string;
  scriptParserArgs: {
    lines: string[];
    title: string;
  };
}

type ModalContract = {
  modal: ModalKey;
  setModal: (key: ModalKey, args?: Partial<ModalArgs>) => void;
  modalArgs: Partial<ModalArgs>;
};

export const ModalContext = React.createContext<ModalContract | undefined>(
  undefined
);

export const ModalProvider = observer(({ children }: any) => {
  const [modal, setModalKey] = useState(ModalKey.NONE);
  const [modalArgs, setModalArgs] = useState<Partial<ModalArgs>>({});

  const setModal = (key: ModalKey, args?: Partial<ModalArgs>) => {
    setModalKey(key);
    setModalArgs(args ?? {});
    if (!args) {
    }
  };

  return (
    <ModalContext.Provider value={{ setModal, modalArgs, modal }}>
      {children}
    </ModalContext.Provider>
  );
});

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
};
