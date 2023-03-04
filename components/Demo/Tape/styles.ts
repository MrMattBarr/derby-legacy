import { StyleSheet } from "react-native";
import { Theme } from "../../../constants/Colors";
import { Sizes } from "../../../styles/sizes";

interface styleProps {
  width?: number;
}
export const generateStyles = (colors: Theme, { width }: styleProps) => {
  const REAL_MAX_SIZE = 500;
  const aspectRatio = 1.6;
  const maxWidth = Math.min(width ?? REAL_MAX_SIZE, REAL_MAX_SIZE);
  let unitSize = maxWidth / 250;
  return StyleSheet.create({
    tape: {
      borderWidth: unitSize / 1.5,
      borderColor: "black",
      position: "relative",
      backgroundColor: "#3f79b3",
      aspectRatio,
      margin: Sizes.Spacings.LARGE,
      borderRadius: unitSize * 6,
      overflow: "hidden",
      maxWidth,
      flexGrow: 1,
      maxHeight: maxWidth / aspectRatio,
      display: "flex",
      flexDirection: "column",
      padding: unitSize * 10,
      paddingBottom: 0,
    },
    tapeBgTexture: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      flexGrow: 1,
    },
  });
};
