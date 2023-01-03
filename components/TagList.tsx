import React from "react";
import { FlatList, StyleSheet, useColorScheme } from "react-native";
import Tag from "./Tag";

export default function TagList({ tags }: { tags: string[] }) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      display: "flex",
    },
  });

  return (
    <FlatList
      style={styles.container}
      data={tags}
      keyExtractor={(item) => item}
      renderItem={({ item }) => <Tag>{item}</Tag>}
    />
  );
}
