import React from "react";
import { StyleSheet } from "react-native";
import { View } from "../../Themed";
import DemoTitle from "./DemoTitle";
import { useTape } from "./Tape";

const FrontTitle = () => {
  const { unitSize } = useTape();
  const { holder } = StyleSheet.create({
    holder: {
      display: "flex",
      flexDirection: "row",
      position: "absolute",
      top: unitSize * 5,
      borderRadius: unitSize,
      width: "90%",
    },
  });

  return (
    <View style={holder}>
      <DemoTitle unitSize={unitSize} />
    </View>
  );
};

export default FrontTitle;
