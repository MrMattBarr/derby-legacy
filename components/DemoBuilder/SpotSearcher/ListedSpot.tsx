import { observer } from "mobx-react";
import React from "react";
import { TouchableOpacity } from "react-native";
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
  const spot = spotStore.spots[spotId];

  return (
    <View style={listedSpot}>
      <Text style={listedSpotText}>{spot?.title}</Text>
    </View>
  );
});

export default ListedSpot;
