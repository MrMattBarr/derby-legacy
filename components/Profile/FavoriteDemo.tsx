import { observer } from "mobx-react";
import React from "react";
import { DemoProvider } from "../../contexts/DemoContext";
import useUser from "../../contexts/UserContext";
import { useColors } from "../../hooks/useColorScheme";
import TapeProvider from "../Demo/Tape/Context";
import Tape from "../Demo/Tape/Tape";
import { View } from "../Themed";
import { generateStyles } from "./styles";

const FavoriteDemo = observer(() => {
  const { user } = useUser();
  const colors = useColors();
  const { favoriteTape } = generateStyles(colors);
  if (!user) {
    return <></>;
  }
  const demo = Object.keys(user?.demos ?? [])[0];

  if (!demo) {
    return <></>;
  }
  return (
    <DemoProvider id={demo}>
      <TapeProvider>
        <View style={favoriteTape}>
          <Tape />
        </View>
      </TapeProvider>
    </DemoProvider>
  );
});

export default FavoriteDemo;
