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
import { useURL } from "expo-linking";
import { PlaybackProvider } from "contexts/PlaybackContext";
import { ReactiveProvider } from "contexts/ReactiveContext";
import { TextBarProvider } from "contexts/TextBarContext";
import { StatusBar } from "expo-status-bar";
import useCachedResources from "hooks/useCachedResources";
import { RootNavigator } from "navigation";
import linking from "navigation/LinkingConfiguration";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthStoreProvider } from "stores/AuthStore";
import { DemosStoreProvider } from "stores/DemosStore";
import { LinesStoreProvider } from "stores/LinesStore";
import { ProjectsStoreProvider } from "stores/ProjectsStore";
import { RolesStoreProvider } from "stores/RolesStore";
import { SpotsStoreProvider } from "stores/SpotsStore";
import { TakesStoreProvider } from "stores/TakesStore";
import { UsersStoreProvider } from "stores/UsersStore";
import { OfferStore, OffersStoreProvider } from "stores/OffersStore";
import ActiveModal from "components/ActiveModal";

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
                  <OffersStoreProvider>
                    <UsersStoreProvider>
                      <ProjectsStoreProvider>
                        <RolesStoreProvider>
                          <LinesStoreProvider>
                            <TakesStoreProvider>
                              <SpotsStoreProvider>
                                <DemosStoreProvider>
                                  <PlaybackProvider>
                                    <ClientProvider>
                                      <ModalProvider>
                                        <TextBarProvider>
                                          <ReactiveProvider>
                                            <ActiveModal />
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
                            </TakesStoreProvider>
                          </LinesStoreProvider>
                        </RolesStoreProvider>
                      </ProjectsStoreProvider>
                    </UsersStoreProvider>
                  </OffersStoreProvider>
                </ApiProvider>
              </AuthStoreProvider>
            </NavigationProvider>
          </NavigationContainer>
        </Background>
      </SafeAreaProvider>
    );
  }
}
