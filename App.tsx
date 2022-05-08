import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppModal from "./components/AppModal";
import Demos from "./components/Demos";
import PlaybackModal from "./components/PlaybackModal";
import { ApiProvider } from "./contexts/ApiContext";
import { DemosProvider } from "./contexts/DemosContext";
import { OverlayProvider } from "./contexts/OverlayContext";
import { SpotsProvider } from "./contexts/SpotsContext";
import { UserProvider } from "./contexts/UserContext";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { RootNavigator } from "./navigation";
import linking from "./navigation/LinkingConfiguration";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NavigationContainer linking={linking}>
          <UserProvider>
            <ApiProvider>
              <SpotsProvider>
                <DemosProvider>
                  <OverlayProvider>
                    <RootNavigator />
                    <AppModal />
                    <PlaybackModal />
                    <StatusBar />
                  </OverlayProvider>
                </DemosProvider>
              </SpotsProvider>
            </ApiProvider>
          </UserProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
