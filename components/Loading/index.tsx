import AppText from "components/Controls/Text";
import Spinner from "components/Spinner";
import { AppColor } from "constants/Colors";
import React from "react";
import { View } from "react-native";
import { Sizes } from "styles/sizes";

const Loading = ({ text }: { text?: string }) => {
  return (
    <View
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Spinner size={60} spinning />
      {text && (
        <AppText
          style={{
            marginLeft: Sizes.Spacings.STANDARD,
            color: AppColor.WARM_WHITE,
            fontSize: Sizes.Fonts.HEADER,
          }}
        >
          {`Loading${text ? ` ${text}` : ""}...`}
        </AppText>
      )}
    </View>
  );
};

export default Loading;
