import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Background from "./components/Background";
import PhoneBottomSpacer from "./components/PhoneBottomSpacer";
import PhoneTopSpacer from "./components/PhoneTopSpacer";
import PlaybackModal from "./components/Playback/modal";
import TextBar from "./components/TextBar";
import WebHeader from "./components/WebHeader";
import { AppColor } from "./constants/Colors";
import { ApiProvider } from "./contexts/ApiContext";
import { ClientProvider } from "./contexts/ClientContext";
import { ModalProvider } from "./contexts/ModalContext";
import { PlaybackProvider } from "./contexts/PlaybackContext";
import { ReactiveProvider } from "./contexts/ReactiveContext";
import { TextBarProvider } from "./contexts/TextBarContext";
import useCachedResources from "./hooks/useCachedResources";
import { RootNavigator } from "./navigation";
import linking from "./navigation/LinkingConfiguration";
import { AuthStoreProvider } from "./stores/AuthStore";
import { DemosStoreProvider } from "./stores/DemosStore";
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
            <AuthStoreProvider>
              <ApiProvider>
                <UsersStoreProvider>
                  <SpotsStoreProvider>
                    <DemosStoreProvider>
                      <PlaybackProvider>
                        <ClientProvider>
                          <ModalProvider>
                            <TextBarProvider>
                              <ReactiveProvider>
                                <PhoneTopSpacer />
                                <WebHeader />
                                <RootNavigator />
                                <TextBar />
                                <PhoneBottomSpacer />
                                <PlaybackModal />
                                <StatusBar />
                              </ReactiveProvider>
                            </TextBarProvider>
                          </ModalProvider>
                        </ClientProvider>
                      </PlaybackProvider>
                    </DemosStoreProvider>
                  </SpotsStoreProvider>
                </UsersStoreProvider>
              </ApiProvider>
            </AuthStoreProvider>
          </NavigationContainer>
        </Background>
      </SafeAreaProvider>
    );
  }
}
