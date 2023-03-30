import { CommonActions, useNavigation } from "@react-navigation/native";
import { NavConfigs, NavPage } from "constants/Navigation";
import React, { ReactNode, useContext, useState } from "react";

type NavContract = {
  go: (destination: NavPage, params?: any) => void;
  reset: (destination: NavPage, args?: any) => void;
  currentPage: NavPage;
};

const NavigationContext = React.createContext({} as NavContract);
export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState(NavPage.PROFILE);
  const navigation = useNavigation();

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
    <NavigationContext.Provider value={{ currentPage, go, reset }}>
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
