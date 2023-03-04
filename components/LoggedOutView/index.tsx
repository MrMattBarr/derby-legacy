import { useFonts } from "expo-font";
import { observer } from "mobx-react";
import React from "react";
import { Image, View } from "react-native";
import { LOGO } from "../../hooks/useCachedResources";
import { useColors } from "../../hooks/useColorScheme";
import { useAuth } from "../../stores/AuthStore";
import BigButton from "../Buttons/BigButton";
import Page from "../Page";
import { Text } from "../Themed";
import { generateStyles } from "./styles";

const LoggedOutView = observer(() => {
  const colors = useColors();
  const styles = generateStyles(colors);
  const image = require("/assets/images/icon.png");
  const LOGO_SIZE = 250;

  const authStore = useAuth();
  const signInAsMatt = () => {
    authStore.authenticateWithEmail({
      email: "matt@barr.farm",
      password: "password",
    });
  };

  const [fontsLoaded] = useFonts({
    Kalam: require("/assets/fonts/Kalam-Regular.ttf"),
    Slab: require("/assets/fonts/ZillaSlab-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <></>;
  }
  return (
    <Page>
      <View style={styles.view}>
        <View style={styles.outer}>
          <View style={styles.logo}>
            <Image
              style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
              source={LOGO}
            />
            <Text style={styles.appName}>Derby Demos</Text>
            <Text style={styles.tagline}>Super fast voice demos</Text>
          </View>
          <View style={styles.buttonHolder}>
            <BigButton onPress={signInAsMatt} label="Sign In As Matt" />
          </View>
        </View>
        <View style={styles.bottomPadding} />
      </View>
    </Page>
  );
});

export default LoggedOutView;
