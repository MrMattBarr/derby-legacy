import { observer } from "mobx-react";
import React from "react";
import { TouchableOpacity } from "react-native";
import useDemo from "../../../contexts/DemoContext";
import { useColors } from "../../../hooks/useColorScheme";
import { useSpots } from "../../../stores/SpotsStore";
import { Text, View } from "../../Themed";
import { generateStyles } from "./styles";

interface ISearchedSpot {
  element: string;
  onSelect: (id: string) => void;
}

const SearchedSpot = observer(
  ({ element: spotId, onSelect }: ISearchedSpot) => {
    const colors = useColors();
    const { searchedSpot, searchedSpotText, selectedSearchedSpot } =
      generateStyles(colors);
    const spotStore = useSpots();
    const demo = useDemo();
    const spot = spotStore.spots[spotId];
    const spotInDemo = demo.demo?.spots?.includes(spotId);

    let style = { ...searchedSpot };
    if (spotInDemo) {
      style = { ...style, ...selectedSearchedSpot };
    }
    return (
      <TouchableOpacity style={style} onPress={() => onSelect(spotId)}>
        <Text style={searchedSpotText}>{spot?.title}</Text>
      </TouchableOpacity>
    );
  }
);

export default SearchedSpot;
