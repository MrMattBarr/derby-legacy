import { FontAwesome } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Image } from "react-native";

export const APP_BG = require("../assets/images/background.png");

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

  const imageAssets = cacheImages([APP_BG]);

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
