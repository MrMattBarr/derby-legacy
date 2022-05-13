import { observer } from "mobx-react";
import React from "react";
import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import useUser from "../contexts/UserContext";
import { mainStyles } from "../listStyles";
import { OTHER_TEST_USER, TEST_USER } from "../testData/users";
import PhoneTopSpacer from "./PhoneTopSpacer";

const WelcomePage = observer(() => {
  const colorScheme = useColorScheme() || "dark";
  const colors = Colors[colorScheme];
  console.log({ colors });
  const users = [TEST_USER, OTHER_TEST_USER];
  const { login } = useUser();
  const styles = mainStyles(colors);
  const localStyles = StyleSheet.create({
    user: {
      padding: 30,
      borderWidth: 1,
      margin: 30,
      backgroundColor: colors.accentBG,
      borderColor: colors.hardBorder,
    },
    page: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      padding: 30,
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.page}>
      <PhoneTopSpacer></PhoneTopSpacer>
      <View style={localStyles.page}>
        {users.map((user) => {
          return (
            <Pressable
              key={user.id}
              style={localStyles.user}
              onPress={() => {
                login(user);
              }}
            >
              <Text style={styles.headerText}>{user.display}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
});

export default WelcomePage;
