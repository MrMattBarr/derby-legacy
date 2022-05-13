import { observer } from "mobx-react";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Colors, { spotColorFromIndex } from "../constants/Colors";
import useDemo from "../contexts/DemoContext";
import useSpots from "../contexts/SpotsContext";
import useColorScheme, { useColors } from "../hooks/useColorScheme";

export const BLANK_ID = "BLANK_ID";
interface IDemoSpot {
  id: string;
}
const DemoSpot = observer(({ id }: IDemoSpot) => {
  const { removeSpot, spotIds } = useDemo();
  const { spots } = useSpots();
  const spot = spots[id];
  const colorScheme = useColorScheme();
  const colors = useColors();
  const demoSlot = spotIds.indexOf(id);
  const styles = StyleSheet.create({
    spot: {
      padding: 20,
      backgroundColor: spotColorFromIndex(colorScheme, demoSlot),
      flexGrow: spot?.length || 1,
      marginRight: -1,
      borderRightWidth: 1,
      borderColor: Colors[colorScheme].borderColor,
    },
    blankSpot: {
      padding: 20,
      backgroundColor: colors.emptyContainer,
      flexGrow: spot?.length || 1,
      marginRight: -1,
      borderRightWidth: 1,
      borderColor: Colors[colorScheme].borderColor,
    },
  });
  if (id === BLANK_ID) {
    return <View style={styles.blankSpot} />;
  }
  return (
    <TouchableOpacity
      onPress={() => removeSpot(id)}
      style={styles.spot}
    ></TouchableOpacity>
  );
});

export default DemoSpot;
