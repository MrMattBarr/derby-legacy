import React from "react";
import { StyleSheet } from "react-native";
import NewSpotBar from "../components/NewSpotBar";
import SpotList from "../components/SpotList";
import { DemoProvider } from "../contexts/DemoContext";
import { RootStackScreenProps } from "../types";

export default function DemoBuilder({
  navigation,
}: RootStackScreenProps<"NotFound">) {
  return (
    <DemoProvider navigation={navigation}>
      <SpotList />
      <NewSpotBar />
    </DemoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
