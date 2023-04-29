import { useColors } from "hooks/useColorScheme";
import React from "react";
import { Text, View } from "react-native";
import textStyles from "styles/text";
import { generateStyles } from "./styles";
import AppText from "components/Controls/Text";

const SubHeader = ({ label }: { label: string }) => {
  const colors = useColors();
  const text = textStyles(colors);

  const { subHeader } = generateStyles(colors);

  return (
    <View style={subHeader}>
      <AppText header>{label}</AppText>
    </View>
  );
};

export default SubHeader;
