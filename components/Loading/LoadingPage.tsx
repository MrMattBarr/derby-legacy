import { View } from "react-native";
import React from "react";
import Loading from "components/Demo/Loading";

const LoadingPage = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Loading size={140} />
      </View>
      <View style={{ flexGrow: 1 }} />
    </View>
  );
};

export default LoadingPage;
