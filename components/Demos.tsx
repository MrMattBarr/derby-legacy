import { observer } from "mobx-react";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import useDemos from "../contexts/DemosContext";
import useColorScheme from "../hooks/useColorScheme";
import DemoLine from "./DemoLine";
import { mainStyles } from "../listStyles";

import PhoneTopSpacer from "./PhoneTopSpacer";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";

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
      <PhoneTopSpacer>
        <View style={styles.header}>
          <Text style={styles.headerText}>Demos</Text>
          <Link to="/demos/new">
            <FontAwesome
              name="plus"
              size={25}
              color={Colors[colorScheme!].text}
            />
          </Link>
        </View>
      </PhoneTopSpacer>
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
