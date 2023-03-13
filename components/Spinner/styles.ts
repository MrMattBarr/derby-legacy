import { StyleSheet } from "react-native";

export const generateStyles = (size: number) => {
  const BOX_SIZE = size * 0.5;
  const OUTER_SIZE = size * 1.3;
  return StyleSheet.create({
    outerHolder: {
      width: OUTER_SIZE,
      height: OUTER_SIZE,
      display: "flex",

      justifyContent: "center",
      overflow: "hidden",
      position: "relative",
    },
    holder: {
      width: size * 1.65,
      height: BOX_SIZE,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: BOX_SIZE * -0.05,
      marginTop: BOX_SIZE * -0.7,
      flexDirection: "row",
      overflow: "hidden",
      transform: [{ rotate: "50deg" }],
    },
    brimHolder: {
      position: "absolute",
      borderColor: "gold",
      top: BOX_SIZE * -0.72,
    },
    spindleHolder: {
      top: 0,
      position: "absolute",
      display: "flex",
      left: BOX_SIZE / 25,
      right: 0,
      justifyContent: "center",
      alignItems: "center",
    },
  });
};
