import React, { useContext, useState } from "react";

type SubmitHandler = (value: string) => void;
interface TextBarArgs {
  text?: string;
  placeholder?: string;
  onSubmit: SubmitHandler;
}
type TextBarContract = {
  submitTextBar?: SubmitHandler;
  setTextBarArgs: (value: TextBarArgs) => void;
  args?: TextBarArgs;
};
const TextBarContext = React.createContext({} as TextBarContract);
export const TextBarProvider = ({ children }: any) => {
  const [textBarArgs, setTextBarArgs] = useState<undefined | TextBarArgs>();

  const submitTextBar = (value: string) => {
    if (textBarArgs?.onSubmit) {
      console.log({ value });
      textBarArgs.onSubmit(value);
      setTextBarArgs(undefined);
    }
  };

  const value = {
    args: textBarArgs,
    setTextBarArgs,
    submitTextBar,
  };

  return (
    <TextBarContext.Provider value={value}>{children}</TextBarContext.Provider>
  );
};

const useTextBar = () => {
  const context = useContext(TextBarContext);
  if (context === undefined) {
    throw new Error("useScript must be used within a TextBarProvider");
  }
  return context;
};

export default useTextBar;
