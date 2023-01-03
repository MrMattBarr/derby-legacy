import React from "react";
import { StyleSheet } from "react-native";
import { View } from "../../Themed";
import DemoTitle from "./DemoTitle";

const FrontTitle = () => {
  const { holder } = StyleSheet.create({
    holder: {
      display: "flex",
      flexDirection: "row",
      position: "absolute",
      top: 10,
      borderRadius: 4,
      width: "90%",
      color: "black",
    },
  });

  return (
    <View style={holder}>
      <DemoTitle />
    </View>
  );
};

export default FrontTitle;
