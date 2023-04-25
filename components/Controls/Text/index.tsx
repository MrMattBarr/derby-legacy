import React from "react";
import { Text } from "react-native";
import { useColors } from "../../../hooks/useColorScheme";
import { generateStyles } from "./styles";

interface IAppText {
  header?: boolean;
  children?: string;
  bold?: boolean;
  style?: any;
}

const AppText = ({ header, children, style, bold }: IAppText) => {
  const colors = useColors();
  const styles = generateStyles(colors, { isHeader: !!header, bold: !!bold });
  return <Text style={[styles.text, style || {}]}>{children}</Text>;
};

export default AppText;
