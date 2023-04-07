import useLine, { LineProvider } from "contexts/LineContext";
import useRole from "contexts/RoleContext";
import { observer } from "mobx-react";
import React from "react";
import { Text, View } from "react-native";
import Nothing from "components/Nothing";
import TakeLine from "./Take";

const ExistingTakes = observer(() => {
  const { line } = useLine();
  const takes = line?.takes ?? [];
  if (takes.length === 0) {
    return <Nothing />;
  }
  return (
    <View>
      {takes.map((id, index) => (
        <TakeLine key={id} id={id} />
      ))}
    </View>
  );
});

export default ExistingTakes;
