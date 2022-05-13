import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { runInAction, toJS } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { View } from "./Themed";
import Colors from "../constants/Colors";
import useApi from "../contexts/ApiContext";
import useSpots from "../contexts/SpotsContext";
import useUser from "../contexts/UserContext";
import useColorScheme, { useColors } from "../hooks/useColorScheme";
import { spotFromFile } from "../types/Spot";

const LogoutButton = observer(() => {
  const colors = useColors();
  const { login } = useUser();
  const logout = () => {
    login(undefined);
  };
  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors.buttonFG,
      borderRadius: 100,
      marginRight: 20,
      padding: 10,
      backgroundColor: colors.contrastBand,
    },
  });
  return (
    <View style={styles.container}>
      <Pressable onPress={logout}>
        <AntDesign name="logout" size={30} color={colors.buttonFG} />
      </Pressable>
    </View>
  );
});
export default LogoutButton;
