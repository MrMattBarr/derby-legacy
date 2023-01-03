import { toJS } from "mobx";
import React from "react";
import { StyleSheet } from "react-native";
import usePlayback from "../../../contexts/PlaybackContext";
import { Text, View } from "../../Themed";

const Screws = () => {
  const SCREW_SIZE = 20;

  const s = StyleSheet.create({
    screw: {
      position: "absolute",
      borderColor: "black",
      borderWidth: 1,
      borderRadius: SCREW_SIZE,
      zIndex: 2,
      width: SCREW_SIZE,
      height: SCREW_SIZE,
      paddingBottom: 3,
      paddingLeft: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "silver",
    },
    screwText: {
      fontWeight: "bold",
      color: "black",
    },
    screwTR: {
      top: 3,
      right: 3,
    },
    screwTL: {
      top: 3,
      left: 3,
    },
    screwBL: {
      bottom: 3,
      left: 3,
    },
    screwBR: {
      bottom: 3,
      right: 3,
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
