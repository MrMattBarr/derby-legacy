import Nothing from "components/Nothing";
import useLine from "contexts/LineContext";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import TakeLine from "./Take";
import { Sizes } from "styles/sizes";

const ExistingTakes = observer(() => {
  const { line } = useLine();
  const takes = line?.takes ?? [];
  if (takes.length === 0) {
    return <Nothing />;
  }
  return (
    <View style={{ paddingBottom: Sizes.Spacings.SMALL }}>
      {takes.map((id) => (
        <TakeLine key={id} id={id} />
      ))}
    </View>
  );
});

export default ExistingTakes;
