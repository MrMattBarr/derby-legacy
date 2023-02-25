import { Entypo, FontAwesome } from "@expo/vector-icons";
import { Link, useLinkTo } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useColors } from "../../hooks/useColorScheme";
import { Text } from "../Themed";
import { generateStyles } from "./styles";

interface ITextButton {
  fontSize?: number;
  link?: string;
  onPress?: () => void;
  disabled?: boolean;
  danger?: boolean;
  icon?: string;
  label: string;
}

const BigButton = ({
  fontSize,
  onPress,
  label,
  danger,
  icon,
  link,
  disabled,
}: ITextButton) => {
  const colors = useColors();
  const styles = generateStyles(colors, { fontSize, danger });
  const linkTo = useLinkTo();

  if (!linkTo && !onPress) {
    throw new Error(
      "BigButton must have either onPress or link defined in props."
    );
  }

  const press = () => {
    if (link) {
      linkTo(link);
    } else {
      onPress!();
    }
  };

  const buttonStyle = disabled ? styles.disabledBigButton : styles.bigButton;

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      style={buttonStyle}
      onPress={press}
    >
      {icon && (
        <FontAwesome
          name={icon as any}
          size={fontSize ?? 20}
          style={styles.bigButtonIcon}
          color={colors.Buttons.foreground}
        />
      )}
      <Text style={styles.bigButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default BigButton;
