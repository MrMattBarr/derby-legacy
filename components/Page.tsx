import React from "react";
import { ImageBackground, View } from "react-native";
import { useColors } from "../hooks/useColorScheme";
import { generatePageStyles } from "../styles/page";
import { Text } from "./Themed";

interface IPage {
  children: React.ReactNode;
  padded?: boolean;
  unpadded?: boolean;
  opaque?: boolean;
}
const Page = ({ children, padded, unpadded, opaque }: IPage) => {
  const colors = useColors();
  const { page, pageContent } = generatePageStyles(colors, {
    padded,
    unpadded,
    opaque,
  });

  const image = require("../assets/images/background.png");
  return (
    <View style={page}>
      <View style={pageContent}>{children}</View>
    </View>
  );
};

export default Page;
