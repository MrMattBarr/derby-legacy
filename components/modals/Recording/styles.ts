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
      marginBottom: Sizes.Spacings.LARGE,
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
    center: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "flex-start",
      paddingVertical: Sizes.Spacings.LARGE,
      flexDirection: "column",
    },
    holder: {
      alignSelf: "center",
      alignItems: "stretch",
      padding: Sizes.Spacings.STANDARD,
      display: "flex",
      width: Sizes.ContentWidths.CENTER,
    },
    playback: {
      padding: Sizes.Spacings.STANDARD,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    playbackBox: {
      padding: Sizes.Spacings.STANDARD,
      borderWidth: 1,
      flexGrow: 1,
      backgroundColor: recording
        ? colors.Backgrounds.playback
        : colors.Backgrounds.empty,
      borderColor: colors.Borders.dramatic,
      maxWidth: Sizes.ContentWidths.CENTER,
      minHeight: Sizes.ContentHeights.MEDIUM,
      borderRadius: Sizes.CURVED_BORDER,
      alignItems: "center",
      display: "flex",
    },
    spinner: {
      position: "absolute",
    },
    secondaryButton: {
      borderRadius: Sizes.CURVED_BORDER,
      borderColor: colors.Borders.default,
      borderWidth: 1,
      marginTop: Sizes.Spacings.STANDARD,
      padding: Sizes.Spacings.STANDARD,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor: colors.Backgrounds.default,
    },
    secondaryButtonText: {
      color: colors.Text.default,
    },
    header: {
      fontSize: Sizes.Fonts.HEADER,
      alignSelf: "center",
      color: colors.Text.default,
      marginBottom: Sizes.Spacings.STANDARD,
    },
    detail: {
      fontSize: Sizes.Fonts.DFEAULT,
      color: colors.Text.subtle,
      opacity: 0.9,
    },
    recordButton: {},
  });
};
