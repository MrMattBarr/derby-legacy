import { observer } from "mobx-react";
import React from "react";
import useSpot from "../../../contexts/SpotContext";
import { useColors } from "../../../hooks/useColorScheme";
import { Text, View } from "../../Themed";
import { generateStyles } from "./styles";

const DemoCount = observer(() => {
  const spot = useSpot();
  const demoCount = spot.spot?.demos?.length ?? 0;
  const colors = useColors();
  const { header } = generateStyles(colors);
  return (
    <View>
      <Text style={header}>Associated Demos ({demoCount})</Text>
    </View>
  );
});
export default DemoCount;
