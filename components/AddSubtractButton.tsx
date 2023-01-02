import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { useColors } from "../hooks/useColorScheme";
import ToggleButton from "./ToggleButton";

interface IAddSubtractButton {
  isAdd?: boolean;
  onToggle?: () => void;
}

const AddSubtractButton = ({ onToggle, isAdd }: IAddSubtractButton) => {
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

export default AddSubtractButton;
