/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import DemoPage from "../components/Demo";
import DemoBuilder from "../components/DemoBuilder";
import Demos from "../components/DemosPage/Demos";
import WelcomePage from "../components/WelcomePage";
import DemoGenerationPage from "../screens/DemoGenerationPage";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = observer(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomePage}
        options={{ headerShown: false, title: "Derby Demos" }}
      />
      <Stack.Screen
        name="DemoGenerationPage"
        component={DemoGenerationPage}
        options={{ headerShown: false, title: "Derby Demos" }}
      />
      <Stack.Screen
        name="DemoBuilder"
        component={DemoBuilder}
        options={{ headerShown: false, title: "Derby Demos" }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DemoDetail"
        component={DemoPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Demos"
        component={Demos}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
});
