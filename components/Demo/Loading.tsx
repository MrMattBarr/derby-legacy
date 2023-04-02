import { observer } from "mobx-react";
import React from "react";
import Page from "../Page";
import { Text, View } from "../Themed";
import Spinner from "components/Spinner";
import { AppColor } from "constants/Colors";
import { Sizes } from "styles/sizes";

const Loading = () => {
  return (
    <View
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Spinner size={60} spinning />
      <Text
        style={{
          marginLeft: Sizes.Spacings.STANDARD,
          color: AppColor.WARM_WHITE,
          fontSize: Sizes.Fonts.HEADER,
        }}
      >
        Loading...
      </Text>
    </View>
  );
};

export default Loading;
