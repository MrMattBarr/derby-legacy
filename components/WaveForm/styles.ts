import { StyleSheet } from "react-native";
import { Theme } from "../../constants/Colors";

export const generateStyles = (colors: Theme) => {
  return StyleSheet.create({
    wavePath: {
      maxHeight: "100%",
    },
    polyline: {},
    waveForm: {
      position: "absolute",
      flexGrow: 1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
    },
  });
};
