import { observer } from "mobx-react";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import useDemos from "../../contexts/DemosContext";
import useColorScheme from "../../hooks/useColorScheme";
import DemoLine from "../DemoLine";
import { mainStyles } from "../../listStyles";

import PhoneTopSpacer from "../PhoneTopSpacer";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import Tape from "./Tape";

const Demos = observer(() => {
  const { demoIds } = useDemos();

  const colorScheme = useColorScheme();
  return (
    <div>
      <Tape id="123" />
    </div>
  );
});

export default Demos;
