import { Platform, StyleSheet } from "react-native";
import { DefaultColors, Theme } from "../../../constants/Colors";

export const generateStyles = (colors: Theme) => {
  const commonControl = {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.Borders.dramatic,
    paddingVertical: 5,
    paddingHorizontal: 10,
  };
  const commonText = {
    fontSize: 16,
    color: colors.Text.default,
  };

  return StyleSheet.create({
    overview: {
      ...commonControl,
      backgroundColor: colors.Backgrounds.secondary,
    },
    text: {
      ...commonText,
    },
    label: {
      ...commonText,
      fontWeight: "bold",
    },
    labelAndText: {
      display: "flex",
      flexDirection: "row",
    },
    visibilityHolder: {
      marginTop: 20,
      marginBottom: 20,
    },
    visibility: {
      ...commonControl,
      marginBottom: 0,
      borderWidth: 2,
      flexDirection: "row",
      display: "flex",
      alignSelf: "flex-start",
      paddingVertical: 0,
      paddingHorizontal: 0,
      borderRadius: 0,
    },
    visibilityEntry: {
      backgroundColor: colors.Backgrounds.empty,
      cursor: "pointer",
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRightWidth: 1,
      borderColor: colors.Borders.dramatic,
    },
    visibilityEntryText: {
      ...commonText,
      fontSize: 20,
      fontWeight: "400",
    },
    selectedVisibility: {
      backgroundColor: colors.Backgrounds.contrast,
    },
    selectedVisibilityText: {
      color: colors.Text.contrast,
    },
  });
};
