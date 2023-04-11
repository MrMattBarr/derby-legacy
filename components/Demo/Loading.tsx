import Spinner from "components/Spinner";
import { AppColor } from "constants/Colors";
import React from "react";
import { Sizes } from "styles/sizes";
import { Text, View } from "../Themed";

const Loading = ({ text }: { text?: string }) => {
  return (
    <View
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Spinner size={60} spinning />
      {text && (
        <Text
          style={{
            marginLeft: Sizes.Spacings.STANDARD,
            color: AppColor.WARM_WHITE,
            fontSize: Sizes.Fonts.HEADER,
          }}
        >
          {`Loading${text ? ` ${text}` : ""}...`}
        </Text>
      )}
    </View>
  );
};

export default Loading;
