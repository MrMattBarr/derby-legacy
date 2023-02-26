import React from "react";
import { StyleSheet } from "react-native";
import { useColors } from "../../../hooks/useColorScheme";
import { Text, View } from "../../Themed";
import { useTape } from "./Tape";

const Screws = () => {
  const { unitSize } = useTape();
  const colors = useColors();

  const SPACING_SIZE = unitSize * 1.5;
  const SCREW_SIZE = unitSize * 10;
  const BOTTOM_PADDING = unitSize * 2;

  const s = StyleSheet.create({
    screw: {
      position: "absolute",
      borderColor: "black",
      borderWidth: unitSize / 1.5,
      borderRadius: SCREW_SIZE,
      zIndex: 2,
      width: SCREW_SIZE,
      height: SCREW_SIZE,
      paddingBottom: BOTTOM_PADDING,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "silver",
    },
    screwText: {
      fontWeight: "bold",
      color: colors.Text.contrast,
      fontSize: unitSize * 8,
    },
    screwTR: {
      top: SPACING_SIZE,
      right: SPACING_SIZE,
    },
    screwTL: {
      top: SPACING_SIZE,
      left: SPACING_SIZE,
    },
    screwBL: {
      bottom: SPACING_SIZE,
      left: SPACING_SIZE,
    },
    screwBR: {
      bottom: SPACING_SIZE,
      right: SPACING_SIZE,
    },
  });

  return (
    <>
      <View style={[s.screw, s.screwTL]}>
        <Text style={s.screwText}>+</Text>
      </View>
      <View style={[s.screw, s.screwTR]}>
        <Text style={s.screwText}>+</Text>
      </View>
      <View style={[s.screw, s.screwBL]}>
        <Text style={s.screwText}>+</Text>
      </View>
      <View style={[s.screw, s.screwBR]}>
        <Text style={s.screwText}>+</Text>
      </View>
    </>
  );
};

export default Screws;
