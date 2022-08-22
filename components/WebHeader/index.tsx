import React from "react";
import { Platform } from "react-native";
import { useColors } from "../../hooks/useColorScheme";
import { mainStyles } from "../../listStyles";
import { View } from "../Themed";

const WebHeader = () => {
  const colors = useColors();
  const styles = mainStyles(colors);
  return <View style={styles.webHeader}>Derby Demo</View>;
};
const Nothing = () => {
  return <></>;
};

const PickyWebHeader = Platform.select({
  native: () => Nothing,
  default: () => WebHeader,
})();

export default PickyWebHeader;
