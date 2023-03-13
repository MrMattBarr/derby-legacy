import { FontAwesome } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Image } from "react-native";

export const APP_BG_DARK = require("../assets/images/background.png");
export const APP_BG_LIGHT = require("../assets/images/background-lighty.png");
export const LOGO = require("../assets/images/adaptive-icon.png");

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const cacheImages = (images: any[]) => {
    return images.map((image) => {
      if (typeof image === "string") {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  };

  const imageAssets = cacheImages([APP_BG_DARK, APP_BG_LIGHT, LOGO]);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        // Load fonts
        await Promise.all([
          ...imageAssets,
          Font.loadAsync({
            ...FontAwesome.font,
            "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
          }),
        ]);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
