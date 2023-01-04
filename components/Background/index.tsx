import React from "react";
import { ImageBackground } from "react-native";
import { AppColor } from "../../constants/Colors";
import { APP_BG } from "../../hooks/useCachedResources";

interface IBackground {
  children: React.ReactNode;
}
const Page = ({ children }: IBackground) => {
  return (
    <ImageBackground
      source={APP_BG}
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
