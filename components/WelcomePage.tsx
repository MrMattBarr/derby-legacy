import { observer } from "mobx-react-lite";
import React from "react";
import { Platform, View } from "react-native";
import { useColors } from "../hooks/useColorScheme";
import { mainStyles } from "../listStyles";
import Tape from "./Demo/Tape";
import TrackList from "./Demo/TrackList";
import PhoneTopSpacer from "./PhoneTopSpacer";
import WebWelcomePage from "./WebWelcomePage";

const LoginPage = observer(() => {
  const colors = useColors();
  const styles = mainStyles(colors);
  return (
    <View style={styles.page}>
      <PhoneTopSpacer />
      <Tape id={"123"} />
      <TrackList id={""} />
    </View>
  );
});

const PickyWelcomePage = Platform.select({
  native: () => LoginPage,
  default: () => LoginPage,
})();

export default PickyWelcomePage;
