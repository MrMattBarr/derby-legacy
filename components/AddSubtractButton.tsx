import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import Colors from "../constants/Colors";
import useColorScheme, { useColors } from "../hooks/useColorScheme";
import ToggleButton from "./ToggleButton";

interface IPlayButton {
  isAdd?: boolean;
  onToggle?: () => void;
}

const PlayButton = ({ onToggle, isAdd }: IPlayButton) => {
  const colors = useColors();
  return (
    <ToggleButton
      isActive={isAdd}
      onToggle={onToggle}
      InactiveIcon={() => (
        <FontAwesome name="minus" size={25} color={colors.buttonFG} />
      )}
      ActiveIcon={() => (
        <FontAwesome name="plus" size={25} color={colors.buttonFG} />
      )}
    />
  );
};

export default PlayButton;
