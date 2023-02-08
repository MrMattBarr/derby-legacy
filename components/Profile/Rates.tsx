import { observer } from "mobx-react";
import React from "react";
import { Text } from "react-native";
import useUser from "../../contexts/UserContext";
import { useColors } from "../../hooks/useColorScheme";
import { View } from "../Themed";
import { generateStyles } from "./styles";

const Rates = observer(() => {
  const { user } = useUser();
  const colors = useColors();
  const { rates } = generateStyles(colors);
  if (!user) {
    return <></>;
  }
  return (
    <View>
      <Text style={rates}>$50 minimum rate</Text>
    </View>
  );
});

export default Rates;
