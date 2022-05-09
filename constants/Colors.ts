import { ColorSchemeName } from "react-native";

const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";
const black = "#000";
const hatRed = "#7d011e";
const charcoal = "#222";
const icyBlue = "#0050a4";
const ivyGreen = "#08640f";
const deepTeal = "#0e5c65";
const slate = "#435d6d";
const deeperTeal = "#00363c";
const deleteRed = "#f32052";
const darkModeBorderColor = hatRed;
const icyWhite = "#fff";
const midGray = "#666";
const stoneGrey = "#374549";
const barelyGray = "#001f2d";
const subtleMint = "#e2f6f7";

export default {
  light: {
    text: black,
    background: icyWhite,
    brandBackground: midGray,
    inputBG: slate,
    tint: tintColorLight,
    tabIconDefault: midGray,
    hardBorder: black,
    progressBarFill: "#7fd37c",
    tag: icyWhite,
    action: stoneGrey,
    contrastBand: barelyGray,
    selectedItemText: icyBlue,
    deleteText: hatRed,
    selectedItemBg: subtleMint,
    borderColor: midGray,
    accentBG: deepTeal,
    contrastBG: slate,
    listItemBackground: icyWhite,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#eee",
    background: "#000",
    inputBG: "#0009",
    brandBackground: charcoal,
    selectedItemText: ivyGreen,
    deleteText: deleteRed,
    action: stoneGrey,
    selectedItemBg: icyBlue,
    contrastBand: barelyGray,
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tag: deepTeal,
    contrastBG: slate,
    accentBG: deeperTeal,
    hardBorder: icyWhite,
    progressBarFill: icyBlue,
    borderColor: darkModeBorderColor,
    listItemBackground: black,
    tabIconSelected: tintColorDark,
  },
};

const spotColorOrder = {
  dark: ["#0b7b27", "#b19800", "#a32424", "#001b5b", "#4b1d5d"],
  light: [subtleMint, "#b3e6c0", "#fbecc0", "#fbc0c0", "#ffec5b", "#eac0fb"],
};

export const spotColorFromIndex = (
  theme: NonNullable<ColorSchemeName>,
  index: number
) => spotColorOrder[theme][index % spotColorOrder[theme].length];
