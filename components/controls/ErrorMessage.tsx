import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { useColors } from "../../hooks/useColorScheme";
import { Sizes } from "../../styles/sizes";

const ErrorMessage = ({ children }: { children: ReactNode }) => {
  const colors = useColors();

  const { box } = StyleSheet.create({
    box: {
      borderWidth: 1,
      borderColor: colors.Borders.error,
      backgroundColor: colors.Backgrounds.error,
      padding: Sizes.Spacings.STANDARD,
    },
  });

  return <View style={box}>{children}</View>;
};

export default ErrorMessage;
