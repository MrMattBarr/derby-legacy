/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  DemoBuilder: undefined;
  Profile: undefined;
  DemoGenerationPage: undefined;
  Spots: undefined;
  ProjectBuilder: undefined;
  DemoDetail: undefined;
  NotFound: undefined;
  Welcome: undefined;
  Projects: undefined;
  Role: undefined;
  Scripts: undefined;
  Demos: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Projects: undefined;
  Demos: undefined;
  Spots: undefined;
  DemoDetail: undefined;
  DemoBuilder: undefined;
  Profile: undefined;
  ProjectBuilder: undefined;
  DemoGenerationPage: undefined;
  Scripts: undefined;
  Account: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
