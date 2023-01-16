import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import * as Haptics from "expo-haptics";
import { useColors } from "../../hooks/useColorScheme";
import ToggleButton from "../ToggleButton";

interface IPlayButton {
  playing?: boolean;
  onToggle?: () => void;
}

const PlayButton = ({ onToggle, playing }: IPlayButton) => {
  const colors = useColors();

  const hapticToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle!();
  };
  return (
    <ToggleButton
      isActive={playing}
      onToggle={hapticToggle}
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
