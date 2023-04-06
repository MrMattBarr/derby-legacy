import { Platform, StyleSheet } from "react-native";
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
    openBoothButton: {
      borderRadius: Sizes.CURVED_BORDER,
      borderWidth: 1,
      borderColor: colors.Borders.default,
      padding: Sizes.Spacings.STANDARD,
      backgroundColor: colors.Backgrounds.secondary,
      margin: Sizes.Spacings.STANDARD,
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "center",
    },
    openButtonText: {
      fontSize: Sizes.Fonts.BIG_BUTTON,
      alignSelf: "center",
      fontWeight: "bold",
      marginLeft: Sizes.Spacings.STANDARD,
      color: colors.Text.default,
    },
    center: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      alignItems: "center",
      overflow: "hidden",
    },
    holder: {
      overflow: "hidden",
      paddingHorizontal: Sizes.Spacings.STANDARD,
      display: "flex",
      maxWidth: "100%",
      width: Sizes.ContentWidths.CENTER,
    },
    playbackBox: {
      padding: Sizes.Spacings.STANDARD,
      flexGrow: 1,
      backgroundColor: recording
        ? colors.Backgrounds.playback
        : colors.Backgrounds.empty,
      minHeight: Sizes.ContentHeights.MEDIUM,
      borderRadius: Sizes.CURVED_BORDER,
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
    },
    playback: {
      borderWidth: 1,
      borderColor: colors.Borders.dramatic,
      borderRadius: Sizes.CURVED_BORDER,
      flexGrow: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      padding: Sizes.Spacings.SMALL,
    },
    playbackTexts: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignSelf: "center",
    },
    buttons: {
      display: "flex",

      flexDirection: "row",
    },
    playbackHolder: {
      display: "flex",
      flexDirection: "row",
    },
    playbackTitle: {
      fontSize: Sizes.Fonts.HEADER,
      color: colors.Text.default,
      fontWeight: "bold",
    },
    spinner: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    secondaryButton: {
      borderRadius: Sizes.CURVED_BORDER,
      borderColor: colors.Borders.default,
      borderWidth: 1,
      marginTop: Sizes.Spacings.LARGE,
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
      color: colors.Text.default,
      opacity: 0.9,
    },
    recordButton: {},
    bottomButtonHolder: {},
  });
};
