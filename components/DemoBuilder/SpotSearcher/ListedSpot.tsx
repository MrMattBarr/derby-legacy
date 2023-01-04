import { observer } from "mobx-react";
import React from "react";
import { Pressable, TouchableOpacity } from "react-native";
import useDemo from "../../../contexts/DemoContext";
import { useColors } from "../../../hooks/useColorScheme";
import { useSpots } from "../../../stores/SpotsStore";
import { Text, View } from "../../Themed";
import { generateStyles } from "./styles";

interface IListedSpot {
  spotId: string;
}

const ListedSpot = observer(({ spotId }: IListedSpot) => {
  const colors = useColors();
  const { listedSpot, listedSpotText } = generateStyles(colors);
  const spotStore = useSpots();
  const { toggleSpot } = useDemo();
  const spot = spotStore.spots[spotId];

  const toggle = () => {
    toggleSpot(spotId);
  };

  return (
    <Pressable style={listedSpot} onPress={toggle}>
      <Text style={listedSpotText}>{spot?.title}</Text>
    </Pressable>
  );
});

export default ListedSpot;
