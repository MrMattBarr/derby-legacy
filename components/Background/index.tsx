import React from "react";
import { ImageBackground } from "react-native";
import { AppColor } from "../../constants/Colors";
import { APP_BG_DARK, APP_BG_LIGHT } from "../../hooks/useCachedResources";
import useColorScheme from "../../hooks/useColorScheme";

interface IBackground {
  children: React.ReactNode;
}
const colorScheme = useColorScheme();
console.log({ colorScheme });

const imgSrc = colorScheme === "light" ? APP_BG_LIGHT : APP_BG_DARK;
const Page = ({ children }: IBackground) => {
  return (
    <ImageBackground
      source={imgSrc}
      fadeDuration={1}
      style={{
        flexGrow: 1,
        backgroundColor: AppColor.NEARLY_BLACK,
      }}
    >
      {children}
    </ImageBackground>
  );
};

export default Page;
