import { observer } from "mobx-react";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type BoothContract = {
  recording: boolean;
  setRecording: Dispatch<SetStateAction<boolean>>;
};

interface IRecordingBoothContext {
  children: React.ReactNode;
}

const RecordingBoothContext = createContext({} as BoothContract);
export const RecordingBoothProvider = observer(
  ({ children }: IRecordingBoothContext) => {
    const [recording, setRecording] = useState(false);

    const value = { recording, setRecording };
    return (
      <RecordingBoothContext.Provider value={value}>
        {children}
      </RecordingBoothContext.Provider>
    );
  }
);

const useRecordingBooth = () => {
  const context = useContext(RecordingBoothContext);
  if (context === undefined) {
    throw new Error(
      "useRecordingBooth must be used within a RecordingProvider"
    );
  }
  return context;
};

export default useRecordingBooth;
