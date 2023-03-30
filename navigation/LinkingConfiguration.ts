/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      DemoGenerationPage: "demos/new",
      DemoBuilder: "demos/:id/edit",
      DemoDetail: "demos/:id",
      Projects: "projects",
      Demos: "demos",
      Profile: "profile/:id",
      Role: "roles/:id",
      Spots: "spots",
      Modal: "modal",
      Welcome: "home",
      NotFound: "*",
    },
  },
};

export default linking;
