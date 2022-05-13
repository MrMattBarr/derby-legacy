import { toJS } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "../components/Themed";
import useDemo from "../contexts/DemoContext";
import useUser from "../contexts/UserContext";
import { useColors } from "../hooks/useColorScheme";

const SaveButton = observer(() => {
  const colors = useColors();
  const { spotIds } = useDemo();
  const { saveDemo } = useDemo();
  const { user } = useUser();
  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors.text,
      borderRadius: 4,
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      alignSelf: "flex-end",
      marginTop: 10,
      padding: 10,
      backgroundColor: colors.buttonBG,
    },
    text: {
      fontWeight: "bold",
      fontSize: 18,
      color: colors.buttonFG,
    },
  });
  if (toJS(spotIds).length === 0) {
    return <></>;
  }
  return (
    <Pressable onPress={() => saveDemo(toJS(user))} style={styles.container}>
      <Text style={styles.text}>Save Demo</Text>
    </Pressable>
  );
});

export default SaveButton;
