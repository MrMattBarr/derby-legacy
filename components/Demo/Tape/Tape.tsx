import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import { ImageBackground, LayoutChangeEvent, Pressable } from "react-native";
import useDemo from "../../../contexts/DemoContext";
import usePlayback from "../../../contexts/PlaybackContext";
import { useColors } from "../../../hooks/useColorScheme";
import { generateStyles } from "./styles";
import Screws from "./Screws";
import TapeLabel from "./TapeLabel";

type RedTapeContract = {
  tapeWidth: number;
  unitSize: number;
};
const TapeContext = React.createContext<RedTapeContract | undefined>(undefined);

const Tape = observer(() => {
  const colors = useColors();
  const { demo } = useDemo();
  const [tapeWidth, setTapeWidth] = useState<number>();

  const { load } = usePlayback();
  const focusMe = () => {
    if (demo?.id) {
      load(demo);
    }
  };

  const styles = generateStyles(colors, { width: tapeWidth });

  const layoutEstablished = (event: LayoutChangeEvent) => {
    setTapeWidth(event.nativeEvent.layout.width);
  };

  const image = {
    uri: "https://www.transparenttextures.com/patterns/skulls.png",
  };

  let width = tapeWidth ?? 0;
  let unitSize = width / 250;

  return (
    <TapeContext.Provider value={{ tapeWidth: width, unitSize }}>
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
        {tapeWidth && (
          <>
            <Screws />
            <TapeLabel />
          </>
        )}
      </Pressable>
    </TapeContext.Provider>
  );
});

export default Tape;

export const useTape = () => {
  const context = useContext(TapeContext);
  if (context === undefined) {
    throw new Error("useTape must be used within a Tape component");
  }
  return context;
};
