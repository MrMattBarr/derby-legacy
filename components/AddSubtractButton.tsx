import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ToggleButton from "./ToggleButton";

interface IPlayButton {
  isAdd?: boolean;
  onToggle?: () => void;
}

const PlayButton = ({ onToggle, isAdd }: IPlayButton) => {
  const colorScheme = useColorScheme();
  return (
    <ToggleButton
      isActive={isAdd}
      onToggle={onToggle}
      InactiveIcon={() => (
        <FontAwesome name="minus" size={25} color={Colors[colorScheme!].text} />
      )}
      ActiveIcon={() => (
        <FontAwesome name="plus" size={25} color={Colors[colorScheme!].text} />
      )}
    />
  );
};

export default PlayButton;
