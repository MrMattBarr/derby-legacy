/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      DemoGenerationPage: "demos/new",
      DemoBuilder: "demos/:id/edit",
      DemoDetail: "demos/:id",
      Projects: "projects",
      Demos: "demos",
      Modal: "modal",
      Welcome: "home",
      Authenticated: "authenticated",
      NotFound: "*",
    },
  },
};

export default linking;
