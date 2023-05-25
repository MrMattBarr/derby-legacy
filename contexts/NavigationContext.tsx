import { CommonActions, useNavigation } from "@react-navigation/native";
import { NavConfigs, NavPage } from "constants/Navigation";
import React, { ReactNode, useContext, useState } from "react";
import { Share } from "react-native";

export enum NavKey {
  OFFER = "offers",
}

interface IShareMessage {
  title?: string;
  message: string;
}

interface IGetDeepLink {
  navKey: NavKey;
  id?: string;
}

type NavContract = {
  go: (destination: NavPage, params?: any) => void;
  reset: (destination: NavPage, args?: any) => void;
  getDeepLink: (args: IGetDeepLink) => void;
  shareMessage: (args: IShareMessage) => void;
  currentPage: NavPage;
};
const NavigationContext = React.createContext({} as NavContract);
export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState(NavPage.PROFILE);
  const APP_PREFIX = "exp://exp.host/@mrmattbarr/derby/--";
  const navigation = useNavigation();

  const getDeepLink = async ({ navKey, id }: IGetDeepLink) => {
    const idSuffix = id ? `?id=${id}` : "";
    return `${APP_PREFIX}/${navKey}${idSuffix}`;
  };

  const shareMessage = async ({ title, message }: IShareMessage) => {
    try {
      const result = await Share.share({
        title: title ?? "Demo Derby",
        message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const go = (destination: NavPage, params: any) => {
    const { name } = NavConfigs[destination];
    navigation.dispatch(
      CommonActions.navigate({
        name,
        params,
      })
    );
    setCurrentPage(destination);
  };

  const reset = (destination: NavPage, params: any) => {
    const { name } = NavConfigs[destination];
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name,
            params,
          },
        ],
      })
    );
    setCurrentPage(destination);
  };
  return (
    <NavigationContext.Provider
      value={{ currentPage, go, reset, getDeepLink, shareMessage }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

const useAppNav = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useAppNav must be used within a NavigationProvider");
  }
  return context;
};

export default useAppNav;
