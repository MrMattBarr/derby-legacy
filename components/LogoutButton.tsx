import { AntDesign } from "@expo/vector-icons";
import { observer } from "mobx-react";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import useUser from "../contexts/UserContext";
import { useColors } from "../hooks/useColorScheme";
import { View } from "./Themed";

const LogoutButton = observer(() => {
  const colors = useColors();
  const { logout } = useUser();
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
