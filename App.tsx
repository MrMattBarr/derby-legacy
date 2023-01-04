import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppModal from "./components/AppModal";
import Background from "./components/Background";
import PhoneBottomSpacer from "./components/PhoneBottomSpacer";
import PhoneTopSpacer from "./components/PhoneTopSpacer";
import PlaybackModal from "./components/Playback";
import WebHeader from "./components/WebHeader";
import { ApiProvider } from "./contexts/ApiContext";
import { PlaybackProvider } from "./contexts/PlaybackContext";
import { ReactiveProvider } from "./contexts/ReactiveContext";
import useCachedResources from "./hooks/useCachedResources";
import { RootNavigator } from "./navigation";
import linking from "./navigation/LinkingConfiguration";
import { AuthStoreProvider } from "./stores/AuthStore";
import { DemosStoreProvider } from "./stores/DemosStore";
import { ModalStoreProvider } from "./stores/ModalStore";
import { SpotsStoreProvider } from "./stores/SpotsStore";
import { UsersStoreProvider } from "./stores/UsersStore";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Background>
          <NavigationContainer linking={linking}>
            <ModalStoreProvider>
              <AuthStoreProvider>
                <ApiProvider>
                  <UsersStoreProvider>
                    <SpotsStoreProvider>
                      <DemosStoreProvider>
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
                      </DemosStoreProvider>
                    </SpotsStoreProvider>
                  </UsersStoreProvider>
                </ApiProvider>
              </AuthStoreProvider>
            </ModalStoreProvider>
          </NavigationContainer>
        </Background>
      </SafeAreaProvider>
    );
  }
}
