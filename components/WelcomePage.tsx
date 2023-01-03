import { Link } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React from "react";
import { Platform, View } from "react-native";
import { DemoProvider } from "../contexts/DemoContext";
import { useColors } from "../hooks/useColorScheme";
import { mainStyles } from "../listStyles";
import Tape from "./Demo/Tape/Tape";
import TrackList from "./Demo/TrackList";

const LoginPage = observer(() => {
  const colors = useColors();
  const styles = mainStyles(colors);
  return (
    <View style={styles.page}>
      <View style={styles.pageContent}>
        <Link to="/demos" style={styles.headerLink}>
          Demos
        </Link>
      </View>
    </View>
  );
});

const PickyWelcomePage = Platform.select({
  native: () => LoginPage,
  default: () => LoginPage,
})();

export default PickyWelcomePage;
