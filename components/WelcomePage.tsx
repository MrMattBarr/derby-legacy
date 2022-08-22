import { observer } from "mobx-react-lite";
import React from "react";
import { Platform, View } from "react-native";
import { useColors } from "../hooks/useColorScheme";
import { mainStyles } from "../listStyles";
import Tape from "./Demo/Tape";
import TrackList from "./Demo/TrackList";
import PhoneTopSpacer from "./PhoneTopSpacer";

const LoginPage = observer(() => {
  const colors = useColors();
  const styles = mainStyles(colors);
  return (
    <View style={styles.page}>
      <PhoneTopSpacer />
      <Tape id="E19GHG" />
      <TrackList id="E19GHG" />
    </View>
  );
});

const PickyWelcomePage = Platform.select({
  native: () => LoginPage,
  default: () => LoginPage,
})();

export default PickyWelcomePage;
