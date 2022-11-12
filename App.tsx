import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppModal from "./components/AppModal";
import PhoneBottomSpacer from "./components/PhoneBottomSpacer";
import PhoneTopSpacer from "./components/PhoneTopSpacer";
import PlaybackModal from "./components/PlaybackModal";
import WebHeader from "./components/WebHeader";
import { ApiProvider } from "./contexts/ApiContext";
import { DemosProvider } from "./contexts/DemosContext";
import { PlaybackProvider } from "./contexts/PlaybackContext";
import { ReactiveProvider } from "./contexts/ReactiveContext";
import { SpotsProvider } from "./contexts/SpotsContext";
import { UserProvider } from "./contexts/UserContext";
import useCachedResources from "./hooks/useCachedResources";
import { RootNavigator } from "./navigation";
import linking from "./navigation/LinkingConfiguration";

export default function App() {
  const isLoadingComplete = useCachedResources();

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
                  <PlaybackProvider>
                    <ReactiveProvider>
                      <PhoneTopSpacer />
                      <WebHeader />
                      <RootNavigator />
                      <PhoneBottomSpacer />
                      <AppModal />
                      <PlaybackModal />
                      <StatusBar />
                    </ReactiveProvider>
                  </PlaybackProvider>
                </DemosProvider>
              </SpotsProvider>
            </ApiProvider>
          </UserProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
