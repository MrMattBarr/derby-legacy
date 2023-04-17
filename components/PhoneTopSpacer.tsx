import React from "react";
import { Platform, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { useColors } from "../hooks/useColorScheme";

export default function PhoneTopSpacer({ children }: any) {
  const colors = useColors();

  const styles = StyleSheet.create({
    spacer: {
      ...Platform.select({
        native: {
          paddingTop: 60,
          borderBottomColor: colors.Borders.default,
        },
      }),
      backgroundColor: colors.Backgrounds.secondary,
    },
  });

  return <View style={styles.spacer}>{children}</View>;
}
