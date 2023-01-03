import React from "react";
import { View } from "react-native";
import { useColors } from "../hooks/useColorScheme";
import { generatePageStyles } from "../styles/page";

interface IPage {
  children: React.ReactNode;
  padded?: boolean;
}
const Page = ({ children, padded }: IPage) => {
  const colors = useColors();
  const pageStyles = generatePageStyles(colors, { padded });
  return (
    <View style={pageStyles.page}>
      <View style={pageStyles.pageContent}>{children}</View>
    </View>
  );
};

export default Page;
