import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { useColors } from "../../hooks/useColorScheme";
import styles from "../../styles/controls";

interface IButton {
  onPress?: () => void;
  link?: string;
  icon?: string;
  label?: string;
}

const WebButton = ({ onPress, link, icon, label }: IButton) => {
  const colors = useColors();
  const { button } = styles(colors);
  return (
    <div>
      <FontAwesome name="pause" size={25} color={colors.buttonFG} />
    </div>
  );
};

export default WebButton;
