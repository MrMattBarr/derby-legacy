import React from "react";
import { ImageBackground } from "react-native";
import { AppColor } from "../../constants/Colors";
import { APP_BG_DARK, APP_BG_LIGHT } from "../../hooks/useCachedResources";

interface IBackground {
  children: React.ReactNode;
}
const Background = ({ children }: IBackground) => {
  const isLight = false; //colorScheme === "light";

  const imgSrc = isLight ? APP_BG_LIGHT : APP_BG_DARK;
  return (
    <ImageBackground
      source={imgSrc}
      style={{
        flexGrow: 1,
        backgroundColor: AppColor.FADED_WHITE,
      }}
    >
      {children}
    </ImageBackground>
  );
};

export default Background;
