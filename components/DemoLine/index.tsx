import { observer } from "mobx-react";
import React from "react";
import { TouchableOpacity } from "react-native";
import useDemo from "../../contexts/DemoContext";
import usePlayback from "../../contexts/PlaybackContext";
import { useColors } from "../../hooks/useColorScheme";
import DemoTitle from "../Demo/Tape/DemoTitle";
import { generateStyles } from "./styles";

const DemoLine = observer(() => {
  const colors = useColors();
  const { load } = usePlayback();

  const { demo } = useDemo();
  const { listItem } = generateStyles(colors, { focused: false });

  const focus = () => {
    load(demo!);
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={focus} style={listItem}>
      <DemoTitle />
    </TouchableOpacity>
  );
});
export default DemoLine;
