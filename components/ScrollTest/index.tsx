import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, View } from "react-native";
import { Sizes } from "styles/sizes";

const ScrollTest = () => {
  return (
    // <View
    //   style={{
    //     borderWidth: 3,
    //     borderColor: "gold",
    //     flexShrink: 1,
    //     flexGrow: 1,
    //     marginTop: Sizes.Spacings.LARGE,
    //     overflow: "hidden",
    //   }}
    // >
    <View
      style={{
        flexDirection: "row",
        borderWidth: 3,
        flexShrink: 1,
        display: "flex",
        borderColor: "black",
      }}
    >
      <ScrollView>
        <LinearGradient
          // Background Linear Gradient
          colors={[
            "red",
            "orange",
            "yellow",
            "green",
            "blue",
            "indigo",
            "violet",
          ]}
          style={{ height: 900 }}
        />
      </ScrollView>
    </View>
    // </View>
  );
};

export default ScrollTest;
