import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { useLines } from "stores/LinesStore";
import { Line } from "types/Line";
import { Take, TakeStatus } from "types/Take";
import Loading from "../components/Demo/Loading";
import { Sound } from "expo-av/build/Audio";
import { AudioMetaData } from "types/AudioMetadata";

type LineContract = {
  line?: Line;
  addTake: (audio: Sound, metadata: AudioMetaData) => void;
};

interface ILineContext {
  children: React.ReactNode;
  id: string;
}

const LineContext = React.createContext({} as LineContract);
export const LineProvider = observer(({ children, id }: ILineContext) => {
  const lineStore = useLines();
  useEffect(() => {
    lineStore.load(id);
  }, [lineStore]);
  const line = lineStore.things[id];

  const addTake = (audio: Sound, metadata: AudioMetaData) => {
    const take: Take = {
      audio,
      id: "test-take-1",
      line: id,
      metadata: {
        duration: 12,
        meters: [],
      },
      status: TakeStatus.UNHEARD,
    };
  };

  return (
    <LineContext.Provider
      value={{
        line,
        addTake,
      }}
    >
      {line && children}
      {!line && (
        <View style={{ backgroundColor: "black", padding: 10 }}>
          <Loading text={`line: "${id}"`} />
        </View>
      )}
    </LineContext.Provider>
  );
});

const useLine = () => {
  const context = useContext(LineContext);
  if (context === undefined) {
    throw new Error("useLine must be used within a LineProvider");
  }
  return context;
};

export default useLine;
