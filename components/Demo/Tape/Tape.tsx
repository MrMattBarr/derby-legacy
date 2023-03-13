import { observer } from "mobx-react";
import React from "react";
import { ImageBackground, Pressable } from "react-native";
import { useColors } from "../../../hooks/useColorScheme";
import { useTape } from "./Context";
import Screws from "./Screws";
import { generateStyles } from "./styles";
import TapeLabel from "./TapeLabel";

type RedTapeContract = {
  tapeWidth: number;
  unitSize: number;
};
const TapeContext = React.createContext<RedTapeContract | undefined>(undefined);

const Tape = observer(() => {
  const colors = useColors();
  const { focusMe, layoutEstablished, tapeWidth } = useTape();

  const styles = generateStyles(colors, { width: tapeWidth });

  const image = {
    uri: "https://www.transparenttextures.com/patterns/skulls.png",
  };

  return (
    <Pressable
      onLayout={layoutEstablished}
      style={styles.tape}
      onPress={focusMe}
    >
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
