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
import Profile from "../components/Profile";
import Spots from "../components/Spots";
import WelcomePage from "../components/WelcomePage";
import DemoGenerationPage from "../screens/DemoGenerationPage";
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
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        contentStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomePage}
        options={{ title: "Derby Demos" }}
      />
      <Stack.Screen
        name="DemoGenerationPage"
        component={DemoGenerationPage}
        options={{ title: "Derby Demos" }}
      />
      <Stack.Screen
        name="DemoBuilder"
        component={DemoBuilder}
        options={{ title: "Derby Demos" }}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} />
      <Stack.Screen name="DemoDetail" component={DemoPage} />
      <Stack.Screen name="Demos" component={Demos} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Spots" component={Spots} />
    </Stack.Navigator>
  );
});
