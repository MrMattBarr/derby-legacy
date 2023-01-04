import { useLinkTo } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import useDemo, { DemoProvider } from "../../contexts/DemoContext";
import { IDemoPage } from "../Demo";
import Page from "../Page";
import Overview from "./Overview";
import SpotSearcher from "./SpotSearcher/SpotSearcher";
import SummaryInput from "./SummaryInput";
import TitleInput from "./TitleInput";

const Content = () => {
  const { isOwner, demo } = useDemo();
  const linkTo = useLinkTo();
  if (!isOwner) {
    linkTo(`/demos/${demo?.id}`);
    return <></>;
  }
  return (
    <Page padded opaque>
      <TitleInput />
      <Overview />
      <SummaryInput />
      <SpotSearcher />
    </Page>
  );
};

const DemoBuilder = observer(({ route }: IDemoPage) => {
  const { id } = route?.params;
  return (
    <DemoProvider id={id}>
      <Content />
    </DemoProvider>
  );
});

export default DemoBuilder;
