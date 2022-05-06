import { observer } from "mobx-react";
import { toJS } from "mobx";
import React from "react";
import Colors from "../constants/Colors";
import useSpots from "../contexts/SpotsContext";
import useColorScheme from "../hooks/useColorScheme";
import TagList from "./TagList";
import { listStyle } from "../listStyles";
import { Text, View } from "./Themed";
import { Pressable } from "react-native";
import useOverlay from "../contexts/OverlayContext";

interface IDemoSpot {
  id: string;
  first?: boolean;
}
const DemoDetailSpot = observer(({ id, first }: IDemoSpot) => {
  const { spots } = useSpots();
  const { focus } = useOverlay();
  const spot = toJS(spots)[id];
  const colorScheme = useColorScheme();
  const styles = listStyle(Colors[colorScheme]);
  const borderTopWidth = first ? 0 : 1;
  return (
    <Pressable
      onPress={() => {
        focus({ id, type: "Spot" });
      }}
      style={{
        borderTopWidth,
        borderTopColor: Colors[colorScheme].hardBorder,
        padding: 10,
        display: "flex",
        backgroundColor: "transparent",
        flexDirection: "row",
      }}
    >
      <Text style={styles.title}>{spot?.title ?? "..."}</Text>
    </Pressable>
  );
});

export default DemoDetailSpot;
