import { observer } from "mobx-react";
import React from "react";
import { FlatList, StyleSheet, useColorScheme } from "react-native";
import Colors from "../constants/Colors";
import useSpots from "../contexts/SpotsContext";
import Spot from "./Spot";

const SpotList = observer(() => {
  const colorScheme = useColorScheme();
  const { spotIds } = useSpots();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme!].brandBackground,
    },
  });
  return (
    <FlatList
      style={styles.container}
      data={[...spotIds]}
      keyExtractor={(item) => item}
      renderItem={({ item }) => <Spot key={item} spotId={item} />}
    />
  );
});

export default SpotList;
