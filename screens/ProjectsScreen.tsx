import React from "react";
import { StyleSheet, useColorScheme, FlatList } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { TEST_SCRIPT } from "../testData/scripts";
import { RootTabScreenProps } from "../types";

export default function ProjectsScreen({
  navigation,
}: RootTabScreenProps<"Projects">) {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme!].brandBackground,
    },
    project: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 5,
      backgroundColor: "#fffb",
    },
    projectTitle: {
      color: Colors[colorScheme!].brandBackground,
      fontWeight: "bold",
    },
    projectSummary: {
      color: Colors[colorScheme!].brandBackground,
      opacity: 0.8,
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={[TEST_SCRIPT]}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.project}>
            <Text style={styles.projectTitle}>{item.name}</Text>
            <Text style={styles.projectSummary}>{item.lines.length} lines</Text>
          </View>
        )}
      />
    </View>
  );
}
