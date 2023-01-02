import { Platform, StyleSheet } from "react-native";
import { Theme } from "../../../constants/Colors";

export const generateStyles = (colors: Theme) => {
  const commonControl = {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.Borders.dramatic,
    paddingVertical: 5,
    paddingHorizontal: 10,
  };
  return StyleSheet.create({
    spotSearchBox: {
      fontSize: 15,
      borderWidth: 1,
      borderRadius: 4,
      overflow: "hidden",
      borderColor: colors.Borders.dramatic,
      color: colors.Text.default,
      backgroundColor: colors.Backgrounds.secondary,
    },
    spotSearchInput: {
      ...commonControl,
      fontSize: 15,
      color: colors.Text.default,
      backgroundColor: colors.Backgrounds.inputs,
      placeholderColor: colors.Text.placeholder,
    },
    spotList: {
      backgroundColor: colors.Backgrounds.empty,
    },
    listedSpot: {
      ...commonControl,
      borderWidth: 0,
      borderRadius: 0,
      marginBottom: 3,
    },
    listedSpotText: {
      color: colors.Text.default,
    },
    searchedSpot: {
      ...commonControl,
      borderRadius: 0,
      borderWidth: 0,
      borderBottomWidth: 1,
      cursor: "pointer",
      backgroundColor: colors.Backgrounds.secondary,
      borderColor: colors.Backgrounds.empty,
    },
    selectedSearchedSpot: {
      backgroundColor: colors.Backgrounds.default,
    },
    searchedSpotText: {
      color: colors.Text.default,
    },
  });
};
