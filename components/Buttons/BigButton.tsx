import { Entypo, FontAwesome } from "@expo/vector-icons";
import { Link, useLinkTo } from "@react-navigation/native";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useColors } from "../../hooks/useColorScheme";
import { Text } from "../Themed";
import { generateStyles } from "./styles";

interface ITextButton {
  fontSize?: number;
  link?: string;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  style?: any;
  disabled?: boolean;
  compact?: boolean;
  danger?: boolean;
  icon?: string;
  label: string;
}

const BigButton = ({
  fontSize,
  onPress,
  onPressIn,
  onPressOut,
  label,
  danger,
  compact,
  icon,
  link,
  disabled,
  style,
}: ITextButton) => {
  const colors = useColors();
  const styles = generateStyles(colors, {
    fontSize,
    danger,
    compact,
    hasIcon: !!icon,
  });
  const linkTo = useLinkTo();

  const press = () => {
    if (link) {
      linkTo(link);
    } else if (onPress) {
      onPress();
    }
  };

  const buttonStyle = disabled ? styles.disabledBigButton : styles.bigButton;

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={{ ...buttonStyle, ...style }}
      onPress={press}
    >
      {icon && (
        <Entypo
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
