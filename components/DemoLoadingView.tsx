import { observer } from "mobx-react";
import React from "react";
import { Text, View } from "./Themed";
import { useColors } from "../hooks/useColorScheme";
import PhoneTopSpacer from "./PhoneTopSpacer";

const DemoLoadingView = observer(() => {
  const colors = useColors();
  return <Text>Loading Demo...</Text>;
});

export default DemoLoadingView;
