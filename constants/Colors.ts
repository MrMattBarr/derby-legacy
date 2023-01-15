import { ColorSchemeName } from "react-native";
import App from "../App";

export enum AppColor {
  TRANSPARENT = "#00000000",
  PURE_WHITE = "#FFFFFF",
  SNOW_WHITE = "#EEEEEE",
  FADED_WHITE = "#CCCCCC",
  PURE_BLACK = "#000000",
  TRANSPARENT_BLACK = "#00000099",
  CLEAR_TEAL = "#0e5c6599",
  PROGRESS_GREEN = "#08640f99",
  NEARLY_BLACK = "#090909",
  CHARCOAL = "#222222",
  HAT_RED = "#7d011e",
  CHALK_RED = "#f32052",
  ICY_BLUE = "#2f95dc",
  OCEAN_BLUE = "#0050a4",
  SLATE = "#435d6d",
  NAVY_BLUE = "#242448",
  DEEP_TEAL = "#0e5c65",
  OLIVE_GREEN = "#80806D",
  TREE_BROWN = "#a48960",
  SANDY_WHITE = "#fff8e9",
  IVY_GREEN = "#08640f",
  TINTED_GRAY = "#445",
  EMPTY_GRAY = "#949494",
  STONE_GRAY = "#333333",
  MINTY_BLUE = "#e2f6f7",
}

export const DefaultColors = {
  TRANSPARENT: AppColor.TRANSPARENT,
};

export interface Theme {
  Text: {
    default: AppColor;
    delete: AppColor;
    subtle: AppColor;
    placeholder: AppColor;
    contrast: AppColor;
  };
  Borders: {
    default: AppColor;
    dramatic: AppColor;
  };
  Backgrounds: {
    default: AppColor;
    primary: AppColor;
    secondary: AppColor;
    empty: AppColor;
    contrast: AppColor;
    label: AppColor;
    inputs: AppColor;
    playback: AppColor;
  };
  Buttons: {
    foreground: AppColor;
    background: AppColor;
  };
  Player: {
    progress: AppColor;
    background: AppColor;
  };
}

type ThemeSet = {
  light: Theme;
  dark: Theme;
};

const AppDarkTheme: Theme = {
  Text: {
    contrast: AppColor.NEARLY_BLACK,
    default: AppColor.SNOW_WHITE,
    subtle: AppColor.FADED_WHITE,
    delete: AppColor.CHALK_RED,
    placeholder: AppColor.STONE_GRAY,
  },
  Borders: {
    default: AppColor.PURE_BLACK,
    dramatic: AppColor.PURE_WHITE,
  },
  Backgrounds: {
    default: AppColor.PURE_BLACK,
    primary: AppColor.CHARCOAL,
    secondary: AppColor.TINTED_GRAY,
    empty: AppColor.STONE_GRAY,
    contrast: AppColor.TREE_BROWN,
    label: AppColor.SANDY_WHITE,
    playback: AppColor.CLEAR_TEAL,
    inputs: AppColor.NEARLY_BLACK,
  },
  Buttons: {
    foreground: AppColor.FADED_WHITE,
    background: AppColor.CHARCOAL,
  },
  Player: {
    progress: AppColor.PROGRESS_GREEN,
    background: AppColor.CHARCOAL,
  },
};
const AppLightTheme: Theme = AppDarkTheme;

const Colors: ThemeSet = {
  light: AppLightTheme,
  dark: AppDarkTheme,
};

const spotColorOrder = {
  dark: ["#0b7b27", "#b19800", "#a32424", "#001b5b", "#4b1d5d"],
  light: [
    AppColor.MINTY_BLUE,
    "#b3e6c0",
    "#fbecc0",
    "#fbc0c0",
    "#ffec5b",
    "#eac0fb",
  ],
};

export default Colors;

export const spotColorFromIndex = (
  theme: NonNullable<ColorSchemeName>,
  index: number
) => spotColorOrder[theme][index % spotColorOrder[theme].length];
