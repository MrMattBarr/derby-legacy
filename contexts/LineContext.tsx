import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import { TEST_LINES } from "testData/lines";
import { Line } from "types/Line";
import Loading from "../components/Demo/Loading";
import Page from "../components/Page";
import { DerbySound } from "./PlaybackContext";
import { Take, TakeStatus } from "types/Take";

type LineContract = {
  line?: Line;
  addTake: (audio: DerbySound) => void;
};

interface ILineContext {
  children: React.ReactNode;
  id: string;
}

const LineContext = React.createContext({} as LineContract);
export const LineProvider = observer(({ children, id }: ILineContext) => {
  const [line, setLine] = useState(TEST_LINES[id]);

  const addTake = (sound: DerbySound) => {
    const take: Take = {
      audio: sound,
      id: "test-take-1",
      line: id,
      metadata: {
        duration: 12,
        meters: [],
      },
      status: TakeStatus.UNHEARD,
    };
    setLine({ ...line, takes: [...line.takes, take.id] });
    console.log({ take });
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
        <Page>
          <Loading />
        </Page>
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
