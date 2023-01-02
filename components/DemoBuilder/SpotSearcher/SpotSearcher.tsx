import { observer } from "mobx-react";
import React from "react";
import { useColors } from "../../../hooks/useColorScheme";
import textStyles from "../../../styles/text";
import { Text, View } from "../../Themed";
import SpotList from "./SpotList";
import SpotSearchInput from "./SpotSearchInput";
import { generateStyles } from "./styles";

const SpotSearcher = observer(() => {
  const colors = useColors();
  const { spotSearchBox } = generateStyles(colors);
  const { h1 } = textStyles(colors);
  return (
    <View>
      <Text style={h1}>Spots</Text>
      <View style={spotSearchBox}>
        <SpotSearchInput />
        <SpotList />
      </View>
    </View>
  );
});

export default SpotSearcher;
