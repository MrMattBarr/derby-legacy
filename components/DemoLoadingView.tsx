import { observer } from "mobx-react";
import React from "react";
import { Text, View } from "../components/Themed";
import { useColors } from "../hooks/useColorScheme";
import { mainStyles } from "../listStyles";
import PhoneTopSpacer from "./PhoneTopSpacer";

const DemoLoadingView = observer(() => {
  const colors = useColors();
  const styles = mainStyles(colors);
  return (
    <View style={styles.page}>
      <PhoneTopSpacer>
        <Text>Loading Demo...</Text>
      </PhoneTopSpacer>
    </View>
  );
});

export default DemoLoadingView;
