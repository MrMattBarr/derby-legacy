import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { useColors } from "../../hooks/useColorScheme";
import ToggleButton from "../ToggleButton";

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
        <FontAwesome name="play" size={25} color={colors.buttonFG} />
      )}
      ActiveIcon={() => (
        <FontAwesome name="pause" size={25} color={colors.buttonFG} />
      )}
    />
  );
};

export default PlayButton;
