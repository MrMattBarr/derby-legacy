import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { useColors } from "../../hooks/useColorScheme";
import ToggleButton from "../ToggleButton";

interface IPlayButton {
  playing?: boolean;
  onToggle?: () => void;
}

const PlayButton = ({ onToggle, playing }: IPlayButton) => {
  const colors = useColors();
  return (
    <ToggleButton
      isActive={playing}
      onToggle={onToggle}
      InactiveIcon={() => (
        <FontAwesome
          name="play"
          size={25}
          color={colors.Buttons.foreground}
          style={{ marginLeft: 4 }}
        />
      )}
      ActiveIcon={() => (
        <FontAwesome name="pause" size={25} color={colors.Buttons.foreground} />
      )}
    />
  );
};

export default PlayButton;
