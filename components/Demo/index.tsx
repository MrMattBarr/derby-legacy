import { observer } from "mobx-react";
import React from "react";
import { DemoProvider } from "../../contexts/DemoContext";
import Preview from "./Preview";
import { useRoute } from "@react-navigation/native";
import Loading from "./Loading";

export interface IDemoPage {
  route: {
    params: {
      id: string;
    };
  };
}

const DemoPage = observer(() => {
  const route = useRoute();
  const id = (route?.params as any)?.id ?? undefined;
  if (!id) {
    return <Loading />;
  }
  return (
    <DemoProvider id={id}>
      <Preview />
    </DemoProvider>
  );
});

export default DemoPage;
