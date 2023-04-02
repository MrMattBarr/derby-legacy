import { NavigationContainer } from "@react-navigation/native";
import Background from "components/Background";
import PhoneNav from "components/PhoneNav";
import PhoneTopSpacer from "components/PhoneTopSpacer";
import PlaybackModal from "components/Playback/modal";
import TextBar from "components/TextBar";
import WebHeader from "components/WebHeader";
import { ApiProvider } from "contexts/ApiContext";
import { ClientProvider } from "contexts/ClientContext";
import { ModalProvider } from "contexts/ModalContext";
import { NavigationProvider } from "contexts/NavigationContext";
import { PlaybackProvider } from "contexts/PlaybackContext";
import { ReactiveProvider } from "contexts/ReactiveContext";
import { TextBarProvider } from "contexts/TextBarContext";
import { StatusBar } from "expo-status-bar";
import useCachedResources from "hooks/useCachedResources";
import { RootNavigator } from "navigation";
import linking from "navigation/LinkingConfiguration";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthStoreProvider } from "stores/AuthStore";
import { DemosStoreProvider } from "stores/DemosStore";
import { ProjectsStoreProvider } from "stores/ProjectsStore";
import { RolesStoreProvider } from "stores/RolesStore";
import { SpotsStoreProvider } from "stores/SpotsStore";
import { UsersStoreProvider } from "stores/UsersStore";

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Background>
          <NavigationContainer linking={linking}>
            <NavigationProvider>
              <AuthStoreProvider>
                <ApiProvider>
                  <UsersStoreProvider>
                    <ProjectsStoreProvider>
                      <RolesStoreProvider>
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
                                      <PhoneNav />
                                      <PlaybackModal />
                                      <StatusBar />
                                    </ReactiveProvider>
                                  </TextBarProvider>
                                </ModalProvider>
                              </ClientProvider>
                            </PlaybackProvider>
                          </DemosStoreProvider>
                        </SpotsStoreProvider>
                      </RolesStoreProvider>
                    </ProjectsStoreProvider>
                  </UsersStoreProvider>
                </ApiProvider>
              </AuthStoreProvider>
            </NavigationProvider>
          </NavigationContainer>
        </Background>
      </SafeAreaProvider>
    );
  }
}
