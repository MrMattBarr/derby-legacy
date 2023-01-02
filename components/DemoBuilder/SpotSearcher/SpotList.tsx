import { observer } from "mobx-react";
import React from "react";
import useDemo from "../../../contexts/DemoContext";
import { useColors } from "../../../hooks/useColorScheme";
import { Text, View } from "../../Themed";
import ListedSpot from "./ListedSpot";
import { generateStyles } from "./styles";

const SpotList = observer(() => {
  const colors = useColors();
  const { spotList } = generateStyles(colors);
  const demoContext = useDemo();
  const spots = demoContext.demo?.spots ?? [];
  return (
    <View style={spotList}>
      {spots.map((id) => (
        <ListedSpot spotId={id} key={id} />
      ))}
    </View>
  );
});

export default SpotList;
