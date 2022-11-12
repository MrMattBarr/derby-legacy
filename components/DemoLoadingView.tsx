import { observer } from "mobx-react";
import React from "react";
import { Text, View } from "./Themed";
import { useColors } from "../hooks/useColorScheme";
import { mainStyles } from "../listStyles";
import PhoneTopSpacer from "./PhoneTopSpacer";

const DemoLoadingView = observer(() => {
  const colors = useColors();
  const styles = mainStyles(colors);
  return (
    <View style={styles.page}>
      <Text>Loading Demo...</Text>
    </View>
  );
});

export default DemoLoadingView;
