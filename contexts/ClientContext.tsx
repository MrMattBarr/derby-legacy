import React, { useContext } from "react";
import { Platform, useWindowDimensions } from "react-native";

type IClientContext = {
  isMobile: boolean;
  isApp: boolean;
};

const ClientContext = React.createContext({} as IClientContext);
export const ClientProvider = ({ children, id }: any) => {
  const { height, width } = useWindowDimensions();
  const isMobileWeb = width <= 1000;
  const isApp = Platform.OS !== "web";
  const isMobile = width <= 1000 || isApp;

  return (
    <ClientContext.Provider value={{ isMobile, isApp }}>
      {children}
    </ClientContext.Provider>
  );
};

const useClient = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error("useClient must be used within a ClientProvider");
  }
  return context;
};

export default useClient;
