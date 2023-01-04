import { observer } from "mobx-react";
import React from "react";
import { DemoProvider } from "../../contexts/DemoContext";
import Preview from "./Preview";

export interface IDemoPage {
  route: {
    params: {
      id: string;
    };
  };
}

const DemoPage = observer(({ route }: IDemoPage) => {
  const { id } = route?.params;
  return (
    <DemoProvider id={id}>
      <Preview />
    </DemoProvider>
  );
  i;
});

export default DemoPage;
