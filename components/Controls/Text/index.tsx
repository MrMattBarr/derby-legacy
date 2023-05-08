import React from "react";
import { Text, TextProps } from "react-native";
import { useColors } from "../../../hooks/useColorScheme";
import { generateStyles } from "./styles";

interface IAppText extends TextProps {
  header?: boolean;
  children?: string;
  bold?: boolean;
  kalam?: boolean;
  strikeThrough?: boolean;
  style?: any;
  wrap?: boolean;
}

const AppText = ({
  header,
  children,
  style,
  bold,
  kalam,
  wrap,
  strikeThrough,
  ...rest
}: IAppText) => {
  const colors = useColors();
  const styles = generateStyles(colors, {
    isHeader: !!header,
    bold: !!bold,
    kalam,
    wrap,
    strikeThrough,
  });

  return (
    <Text style={[styles.text, style || {}]} {...rest}>
      {children}
    </Text>
  );
};

export default AppText;
