import React from "react";
import { ImageBackground } from "react-native";
import { AppColor } from "../../constants/Colors";
import { APP_BG_DARK, APP_BG_LIGHT } from "../../hooks/useCachedResources";
import useColorScheme from "../../hooks/useColorScheme";

interface IBackground {
  children: React.ReactNode;
}
const Page = ({ children }: IBackground) => {
  const colorScheme = useColorScheme();

  const imgSrc = colorScheme === "light" ? APP_BG_LIGHT : APP_BG_DARK;
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
