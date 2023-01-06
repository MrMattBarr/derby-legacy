import React from "react";
import { View } from "react-native";
import { useColors } from "../hooks/useColorScheme";
import { generatePageStyles } from "../styles/page";
import Background from "./Background";

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
    <Background>
      <View style={page}>
        <View style={pageContent}>{children}</View>
      </View>
    </Background>
  );
};

export default Page;
