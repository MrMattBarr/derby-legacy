import { observer } from "mobx-react";
import React, { ReactNode, useContext, useState } from "react";
import { ImageBackground, LayoutChangeEvent, Pressable } from "react-native";
import useDemo from "../../../contexts/DemoContext";
import usePlayback from "../../../contexts/PlaybackContext";
import { useColors } from "../../../hooks/useColorScheme";
import Screws from "./Screws";
import { generateStyles } from "./styles";
import TapeLabel from "./TapeLabel";

type RedTapeContract = {
  tapeWidth: number;
  unitSize: number;
  focusMe: () => void;
  layoutEstablished: (event: LayoutChangeEvent) => void;
};
const TapeContext = React.createContext<RedTapeContract | undefined>(undefined);

const TapeProvider = observer(({ children }: { children: ReactNode }) => {
  const { demo } = useDemo();
  const [tapeWidth, setTapeWidth] = useState<number>();

  const { load } = usePlayback();
  const focusMe = () => {
    if (demo?.id) {
      load(demo);
    }
  };

  const layoutEstablished = (event: LayoutChangeEvent) => {
    setTapeWidth(event.nativeEvent.layout.width);
  };

  let width = tapeWidth ?? 0;
  let unitSize = width / 250;

  return (
    <TapeContext.Provider
      value={{ tapeWidth: width, unitSize, layoutEstablished, focusMe }}
    >
      {children}
    </TapeContext.Provider>
  );
});

export default TapeProvider;

export const useTape = () => {
  const context = useContext(TapeContext);
  if (context === undefined) {
    throw new Error("useTape must be used within a Tape component");
  }
  return context;
};
