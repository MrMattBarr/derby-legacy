import { observer } from "mobx-react";
import React from "react";
import { Text } from "react-native";
import { SpotProvider } from "../../contexts/SpotContext";
import useUser from "../../contexts/UserContext";
import { useColors } from "../../hooks/useColorScheme";
import { View } from "../Themed";
import Spot from "./Spot";
import { generateStyles } from "./styles";

const SpotList = observer(() => {
  const { user } = useUser();
  const colors = useColors();
  const { section } = generateStyles(colors);

  if (!user) {
    return <></>;
  }

  const spotIds = Object.keys(user?.spots);
  return (
    <View style={section}>
      {spotIds.map((id) => {
        return (
          <SpotProvider id={id} key={id}>
            <Spot />
          </SpotProvider>
        );
      })}
    </View>
  );
});

export default SpotList;
