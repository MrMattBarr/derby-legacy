import { StyleSheet } from "react-native";
import { AppColor, Theme } from "../../../constants/Colors";
import { Sizes } from "../../../styles/sizes";

interface IRecordingStyles {
  recording?: boolean;
}

export const generateStyles = (
  colors: Theme,
  { recording }: IRecordingStyles = {}
) => {
  const signColor = recording ? AppColor.CHALK_RED : AppColor.SLATE;
  return StyleSheet.create({
    sign: {
      borderColor: signColor,
      padding: Sizes.Spacings.STANDARD,
      borderRadius: Sizes.CURVED_BORDER,
      borderWidth: 2,
      alignSelf: "center",
      paddingHorizontal: Sizes.Spacings.LARGE,
      boxShadow: "5px 5px 5px #300, 5px 5px 5px #300 inset",
    },
    signText: {
      fontSize: 30,
      color: signColor,
      textShadowColor: "#300",
      textShadowOffset: { width: 5, height: 5 },
      textShadowRadius: 5,
    },
    booth: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
  });
};
