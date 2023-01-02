import { observer } from "mobx-react";
import React from "react";
import useDemo, { DemoProvider } from "../../contexts/DemoContext";
import DemoBuilder from "../DemoBuilder";
import Page from "../Page";
import Loading from "./Loading";
import Preview from "./Preview";

const ServedView = () => {
  return <Preview />;
};

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
      <Page>
        <ServedView />
      </Page>
    </DemoProvider>
  );
});

export default DemoPage;
