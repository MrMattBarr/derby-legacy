import React from "react";
import { View } from "react-native";
import useClient from "../contexts/ClientContext";
import { useColors } from "../hooks/useColorScheme";
import { generatePageStyles } from "../styles/page";
import Background from "./Background";

interface IPage {
  children: React.ReactNode;
  padded?: boolean;
  centered?: boolean;
  unpadded?: boolean;
  opaque?: boolean;
}
const Page = ({ children, padded, unpadded, opaque, centered }: IPage) => {
  const colors = useColors();
  const { isMobile } = useClient();
  const { page, pageContent } = generatePageStyles(colors, {
    padded,
    unpadded,
    centered,
    opaque,
    isMobile,
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
