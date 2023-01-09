import { observer } from "mobx-react";
import React from "react";
import { ImageBackground, Pressable } from "react-native";
import useDemo from "../../../contexts/DemoContext";
import usePlayback from "../../../contexts/PlaybackContext";
import { useColors } from "../../../hooks/useColorScheme";
import { generateStyles } from "../styles";
import Screws from "./Screws";
import TapeLabel from "./TapeLabel";

const Tape = observer(() => {
  const colors = useColors();

  const { demo } = useDemo();

  const { focusDemo } = usePlayback();
  const focusMe = () => {
    if (demo?.id) {
      focusDemo(demo.id);
    }
  };

  const styles = generateStyles(colors);

  const image = {
    uri: "https://www.transparenttextures.com/patterns/skulls.png",
  };

  return (
    <Pressable style={styles.tape} onPress={focusMe}>
      <ImageBackground
        source={image}
        resizeMode="repeat"
        style={styles.tapeBgTexture}
      />
      <Screws />
      <TapeLabel />
    </Pressable>
  );
});

export default Tape;
