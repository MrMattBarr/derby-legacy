import { StyleSheet } from "react-native";
import { AppColor, Theme } from "../../../constants/Colors";
import { Sizes } from "../../../styles/sizes";

export const generateStyles = (colors: Theme) => {
  return StyleSheet.create({
    sign: {
      borderColor: AppColor.CHALK_RED,
      padding: Sizes.Spacings.STANDARD,
      borderRadius: Sizes.CURVED_BORDER,
      borderWidth: 2,
      alignSelf: "center",
      paddingHorizontal: Sizes.Spacings.LARGE,
      boxShadow: "5px 5px 5px #300, 5px 5px 5px #300 inset",
    },
    signText: {
      fontSize: 30,
      color: AppColor.CHALK_RED,
      textShadowColor: "#300",
      textShadowOffset: { width: 5, height: 5 },
      textShadowRadius: 5,
    },
    modal: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
    },
  });
};
