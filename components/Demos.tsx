import { observer } from "mobx-react";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import useDemos from "../contexts/DemosContext";
import useColorScheme from "../hooks/useColorScheme";
import { mainStyles } from "../listStyles";
import DemoLine from "./DemoLine";

const Demos = observer(() => {
  const { demoIds } = useDemos();

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const styles = mainStyles(colors);
  const localStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme!].brandBackground,
    },
  });
  return (
    <View style={styles.page}>
      <FlatList
        style={localStyles.container}
        data={[...demoIds]}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <DemoLine demoId={item} />}
      />
    </View>
  );
});

export default Demos;
