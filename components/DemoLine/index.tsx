import { useLinkTo } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { TouchableOpacity } from "react-native";
import useDemo from "../../contexts/DemoContext";
import { useColors } from "../../hooks/useColorScheme";
import DemoTitle from "../Demo/Tape/DemoTitle";
import { generateStyles } from "./styles";

const DemoLine = observer(() => {
  const colors = useColors();
  const linkTo = useLinkTo();
  const { listItem } = generateStyles(colors);
  const { demo } = useDemo();

  const goToDemo = () => {
    linkTo(`/demos/${demo?.id}`);
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={goToDemo} style={listItem}>
      <DemoTitle />
    </TouchableOpacity>
  );
});
export default DemoLine;
