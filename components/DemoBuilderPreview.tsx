import { toJS } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import useDemo from "../contexts/DemoContext";
import { useColors } from "../hooks/useColorScheme";
import DemoSpot, { BLANK_ID } from "./DemoSpot";
import SaveButton from "./SaveButton";

const DemoBuilderPreview = observer(() => {
  const colors = useColors();
  const { spotIds } = useDemo();
  const jsSpots = toJS(spotIds);
  const styles = StyleSheet.create({
    container: {
      color: "#eee",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderBottomColor: colors.borderColor,
      borderBottomWidth: 2,
    },
    demoVisualizer: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: colors.borderColor,
      backgroundColor: colors.background,
      overflow: "hidden",
      display: "flex",
      flexDirection: "row",
    },
    demoTitle: {
      color: colors.text,
      fontWeight: "bold",
      fontSize: 20,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.demoVisualizer}>
        {spotIds.length === 0 && <DemoSpot id={BLANK_ID} />}
        {jsSpots.map((id) => {
          return <DemoSpot key={id} id={id} />;
        })}
      </View>
      <SaveButton />
    </View>
  );
});

export default DemoBuilderPreview;
