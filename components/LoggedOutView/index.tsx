import Background from "components/Background";
import BigButton from "components/Buttons/BigButton";
import Spinner from "components/Spinner";
import { useFonts } from "expo-font";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { useAuth } from "stores/AuthStore";
import { generateStyles } from "./styles";

const LoggedOutView = observer(() => {
  const colors = useColors();
  const styles = generateStyles(colors);
  const [spinning, setSpinning] = useState(false);
  const LOGO_SIZE = 300;

  const FAKE_LOGIN_TIME = 1000;

  const authStore = useAuth();
  const signInAsMatt = () => {
    setSpinning(true);
    setTimeout(() => {
      authStore.authenticateWithEmail({
        email: "matt@barr.farm",
        password: "password",
      });
    }, FAKE_LOGIN_TIME);
  };

  const [fontsLoaded] = useFonts({
    Kalam: require("/assets/fonts/Kalam-Regular.ttf"),
    Slab: require("/assets/fonts/ZillaSlab-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <></>;
  }

  const label = spinning ? "signing in..." : "Sign in as Matt Barr";

  return (
    <Background>
      <View style={styles.view}>
        <View style={styles.outer}>
          <View style={styles.logo}>
            <Spinner size={LOGO_SIZE} spinning={spinning} />
            <Text style={styles.appName}>Derby Demos</Text>
            <Text style={styles.tagline}>Super fast voice demos</Text>
          </View>
          <View style={styles.buttonHolder}>
            <BigButton
              onPress={signInAsMatt}
              label={label}
              disabled={spinning}
            />
          </View>
        </View>
        <View style={styles.bottomPadding} />
      </View>
    </Background>
  );
});

export default LoggedOutView;
