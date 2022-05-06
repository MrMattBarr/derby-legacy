import { DocumentResult } from "expo-document-picker";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { useLocalObservable } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { subscribeToUserDemos, uploadFile, UploadFileArgs } from "../api";

type ApiStore = {
  uploadFile: (args: Partial<UploadFileArgs>) => void;
};

const ApiContext = React.createContext({} as ApiStore);

export const ApiProvider = ({ children }: any) => {
  const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyBrcM1Eusy8F6hjrLYVn2OUxWPcb4YU1QU",
    authDomain: "derby-voice.firebaseapp.com",
    databaseURL: "https://derby-voice-default-rtdb.firebaseio.com/",
    projectId: "derby-voice",
    storageBucket: "derby-voice.appspot.com",
    messagingSenderId: "412157728746",
    appId: "1:412157728746:web:a5d89be721b7881dfcc493",
    measurementId: "G-388F9FBEGB",
  };

  const user = "MrMattBarr";

  initializeApp(firebaseConfig);

  const store = useLocalObservable(() => ({
    uploadFile: (args: Partial<UploadFileArgs>) =>
      uploadFile({ user, file: args.file!, ...args }),
  }));

  return <ApiContext.Provider value={store}>{children}</ApiContext.Provider>;
};

const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApi must be used within a ApiProvider");
  }
  return context;
};

export default useApi;
