import { toJS } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Text } from "react-native";
import { DemoProvider } from "../../contexts/DemoContext";
import useUser, { UserProvider } from "../../contexts/UserContext";
import { useColors } from "../../hooks/useColorScheme";
import { useAuth } from "../../stores/AuthStore";
import { ParameterPage } from "../../types/ParameterPage";
import Tape from "../Demo/Tape/Tape";
import Page from "../Page";
import { View } from "../Themed";
import { generateStyles } from "./styles";
import UserCard from "./UserCard";

const FavoriteDemo = observer(() => {
  const { user } = useUser();
  console.log({ user });
  const colors = useColors();
  const { favoriteTape } = generateStyles(colors);
  if (!user) {
    return <></>;
  }
  const demo = Object.keys(user?.demos)[0];
  console.log(toJS(user));

  if (!demo) {
    return <></>;
  }
  return (
    <DemoProvider id={demo}>
      <View style={favoriteTape}>
        <Tape />
      </View>
    </DemoProvider>
  );
});

export default FavoriteDemo;
