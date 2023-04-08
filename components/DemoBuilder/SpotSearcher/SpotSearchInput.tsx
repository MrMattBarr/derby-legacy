import { toJS } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { TextInput } from "react-native";
import useDemo from "../../../contexts/DemoContext";
import { useColors } from "../../../hooks/useColorScheme";
import { useSpots } from "../../../stores/SpotsStore";
import SearchSelector from "../../Controls/SearchSelector";
import SearchedSpot from "./SearchedSpot";
import { generateStyles } from "./styles";

const SpotSearchInput = observer(() => {
  const { toggleSpot } = useDemo();
  const spotStore = useSpots();
  const spotIds = spotStore.ids;
  const selectSpot = (spotId: string) => {
    toggleSpot(spotId);
  };
  const spotMatches = (query: string, spotId: string) => {
    const spot = spotStore.things[spotId];
    const lowerTitle = spot.title.toLowerCase();
    const lowerQuery = query.toLowerCase().trim();
    const nameMatches = lowerTitle.includes(lowerQuery);
    return nameMatches;
  };
  return (
    <SearchSelector
      items={spotIds}
      renderElement={SearchedSpot}
      onSelect={selectSpot}
      match={spotMatches}
    />
  );
});

export default SpotSearchInput;
