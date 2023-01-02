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
  icon?: string;
  label: string;
}

const BigButton = ({ fontSize, onPress, label, icon, link }: ITextButton) => {
  const colors = useColors();
  const styles = generateStyles(colors, { fontSize });
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

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.bigButton}
      onPress={onPress}
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
