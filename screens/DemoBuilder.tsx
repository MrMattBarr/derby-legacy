import { StyleSheet } from "react-native";
import SpotList from "../components/SpotList";
import { SpotsProvider } from "../contexts/SpotsContext";
import { RootStackScreenProps } from "../types";
import DemoBuilderPreview from "../components/DemoBuilderPreview";
import { DemoProvider } from "../contexts/DemoContext";
import NewSpotBar from "../components/NewSpotBar";
import React from "react";
import SaveButton from "../components/SaveButton";
import PhoneBottomSpacer from "../components/PhoneBottomSpacer";
import PhoneTopSpacer from "../components/PhoneTopSpacer";

export default function DemoBuilder({
  navigation,
}: RootStackScreenProps<"NotFound">) {
  return (
    <DemoProvider navigation={navigation}>
      <PhoneTopSpacer>
        <DemoBuilderPreview />
      </PhoneTopSpacer>
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
