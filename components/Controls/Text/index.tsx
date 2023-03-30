import React from "react";
import { Text } from "react-native";
import { useColors } from "../../../hooks/useColorScheme";
import { generateStyles } from "./styles";

interface IAppText {
  header?: boolean;
  children?: string;
}

const AppText = ({ header, children }: IAppText) => {
  const colors = useColors();
  const styles = generateStyles(colors, { isHeader: !!header });
  return <Text style={styles.text}>{children}</Text>;
};

export default AppText;
