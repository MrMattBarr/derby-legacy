import { useLinkTo, useRoute } from "@react-navigation/native";
import Loading from "components/Demo/Loading";
import { observer } from "mobx-react";
import React from "react";
import useDemo, { DemoProvider } from "../../contexts/DemoContext";
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
      <SpotSearcher />
      <TitleInput />
      <Overview />
      <SummaryInput />
    </Page>
  );
};

const DemoBuilder = observer(() => {
  const route = useRoute();
  const id = (route?.params as any)?.id ?? undefined;
  if (!id) {
    return <Loading />;
  }
  return (
    <DemoProvider id={id}>
      <Content />
    </DemoProvider>
  );
});

export default DemoBuilder;
