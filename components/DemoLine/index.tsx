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
  const { focusDemo, active } = usePlayback();

  const { demo } = useDemo();
  const focused = active?.demo === demo?.id;
  const { listItem } = generateStyles(colors, { focused });

  const focus = () => {
    focusDemo(demo!.id);
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={focus} style={listItem}>
      <DemoTitle />
    </TouchableOpacity>
  );
});
export default DemoLine;
