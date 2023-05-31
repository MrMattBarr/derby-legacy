import { Recording } from "expo-av/build/Audio";
import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { useLines } from "stores/LinesStore";
import { useTakes } from "stores/TakesStore";
import { AudioMetaData } from "types/AudioMetadata";
import { Line } from "types/Line";
import { Take, ApprovalStatus } from "types/Take";
import Loading from "../components/Demo/Loading";
import { Completable } from "api";
import useRole from "./RoleContext";

interface addTakeArgs {
  recording: Recording;
  metadata: AudioMetaData;
  callbacks: Completable;
}

type LineContract = {
  line?: Line;
  backupName: string;
  addTake: ({ recording, metadata }: addTakeArgs) => Promise<void>;
};

interface ILineContext {
  children: React.ReactNode;
  id: string;
  index?: number;
}

const LineContext = React.createContext({} as LineContract);
export const LineProvider = observer(
  ({ children, id, index }: ILineContext) => {
    const lineStore = useLines();
    const takeStore = useTakes();
    useEffect(() => {
      lineStore.load(id);
    }, [lineStore]);
    const { role } = useRole();
    const line = lineStore.things[id];
    const takeIds = line.takes ?? [];
    const takes = takeIds.map((x) => takeStore.things[x]);

    useEffect(() => {
      takeIds.map((takeId) => takeStore.load(takeId));
    }, [takeIds]);

    const hearMeOut = () => {
      const allHere = takes.every((x) => !!x);
      const allHeard =
        allHere &&
        takes.every((take) => take.status !== ApprovalStatus.UNHEARD);
      if (line.status === ApprovalStatus.UNHEARD && allHeard) {
        lineStore.update({ id, status: ApprovalStatus.HEARD });
      }
      if (line.status === ApprovalStatus.HEARD && !allHeard) {
        lineStore.update({ id, status: ApprovalStatus.UNHEARD });
      }
    };

    useEffect(hearMeOut, [takes]);

    const addTake = async ({
      recording,
      metadata,
      callbacks,
    }: {
      recording: Recording;
      metadata: AudioMetaData;
      callbacks?: Completable;
    }) => {
      const partialTake: Partial<Take> = {
        line: id,
        metadata,
        status: ApprovalStatus.UNHEARD,
        number: (line.takes?.length ?? 0) + 1,
      };

      const take = await takeStore.create(partialTake, recording);
      lineStore.update(
        {
          id,
          takes: [...(line.takes ?? []), take.id],
          status: ApprovalStatus.UNHEARD,
        },
        callbacks
      );
    };

    const backupName = `${role?.name} ${index === undefined ? "" : index + 1}`;

    return (
      <LineContext.Provider
        value={{
          line,
          addTake,
          backupName,
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
  }
);

const useLine = () => {
  const context = useContext(LineContext);
  if (context === undefined) {
    throw new Error("useLine must be used within a LineProvider");
  }
  return context;
};

export default useLine;
