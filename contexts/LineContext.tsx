import { Recording } from "expo-av/build/Audio";
import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { useLines } from "stores/LinesStore";
import { useTakes } from "stores/TakesStore";
import { AudioMetaData } from "types/AudioMetadata";
import { Line } from "types/Line";
import { Take, TakeStatus } from "types/Take";
import Loading from "../components/Demo/Loading";

type LineContract = {
  line?: Line;
  addTake: ({
    recording,
    metadata,
  }: {
    recording: Recording;
    metadata: AudioMetaData;
  }) => Promise<void>;
};

interface ILineContext {
  children: React.ReactNode;
  id: string;
}

const LineContext = React.createContext({} as LineContract);
export const LineProvider = observer(({ children, id }: ILineContext) => {
  const lineStore = useLines();
  const takeStore = useTakes();
  useEffect(() => {
    lineStore.load(id);
  }, [lineStore]);
  const line = lineStore.things[id];

  const addTake = async ({
    recording,
    metadata,
  }: {
    recording: Recording;
    metadata: AudioMetaData;
  }) => {
    const partialTake: Partial<Take> = {
      line: id,
      metadata,
      status: TakeStatus.UNHEARD,
      number: (line.takes.length ?? 0) + 1,
    };

    const take = await takeStore.create(partialTake, recording);
    lineStore.update({ id, takes: [...(line.takes ?? []), take.id] });
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
