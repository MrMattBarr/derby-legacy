export enum AppColor {
  TRANSPARENT = "#00000000",
  PURE_WHITE = "#FFFFFF",
  SNOW_WHITE = "#EEEEEE",
  FADED_WHITE = "#CCCCCC",
  BARELY_WHITE = "#999",
  PURE_BLACK = "#000000",
  TRANSPARENT_BLACK = "#00000099",
  TRANSPARENT_WHITE = "#eee7",
  CLEAR_TEAL = "#0e5c6599",
  PROGRESS_GREEN = "#08640f99",
  NEARLY_BLACK = "#090909",
  CHARCOAL = "#222222",
  HAT_RED = "#7d011e99",
  CHALK_RED = "#f32052",
  BLUSH_PINK = "#d67e8c",
  HOUSE_BLUE = "#89a0cc",
  TRANSPARENT_HOUSE_BLUE = "#79a0e899",
  ICY_BLUE = "#91bddb",
  OCEAN_BLUE = "#0050a4",
  SLATE = "#435d6d",
  NAVY_BLUE = "#242448",
  DEEP_TEAL = "#0e5c65",
  OLIVE = "#80806D",
  TREE_BROWN = "#534b40",
  SANDY_WHITE = "#fff8e9",
  IVY_GREEN = "#08640f",
  DIRTY_GOLD = "#474221",
  JALAPENO_GREEN = "#67f266",
  TINTED_GRAY = "#445",
  AQUA = "#035563",
  PLUM = "#730e8a",
  EMPTY_GRAY = "#949494",
  STONE_GRAY = "#333333",
  WARM_WHITE = "#cfc5b0",
}

export const DefaultColors = {
  TRANSPARENT: AppColor.TRANSPARENT,
};

export interface Theme {
  Text: {
    default: AppColor;
    error: AppColor;
    delete: AppColor;
    complete: AppColor;
    notice: AppColor;
    subtle: AppColor;
    placeholder: AppColor;
    contrast: AppColor;
  };
  Borders: {
    default: AppColor;
    dramatic: AppColor;
    subtle: AppColor;
    error: AppColor;
  };
  Backgrounds: {
    default: AppColor;
    success: AppColor;
    primary: AppColor;
    secondary: AppColor;
    empty: AppColor;
    complete: AppColor;
    contrast: AppColor;
    transparentDefault: AppColor;
    label: AppColor;
    inputs: AppColor;
    error: AppColor;
    playback: AppColor;
    submit: AppColor;
  };
  Buttons: {
    foreground: AppColor;
    background: AppColor;
  };
  Gear: {
    inactive: AppColor;
    active: AppColor;
  };
  Player: {
    progress: AppColor;
    waveform: AppColor;
  };
}

type ThemeSet = {
  light: Theme;
  dark: Theme;
};

const AppDarkTheme: Theme = {
  Text: {
    contrast: AppColor.NEARLY_BLACK,
    notice: AppColor.JALAPENO_GREEN,
    default: AppColor.SNOW_WHITE,
    subtle: AppColor.BARELY_WHITE,
    complete: AppColor.WARM_WHITE,
    error: AppColor.CHALK_RED,
    delete: AppColor.CHALK_RED,
    placeholder: AppColor.STONE_GRAY,
  },
  Borders: {
    default: AppColor.PURE_BLACK,
    subtle: AppColor.SLATE,
    dramatic: AppColor.PURE_WHITE,
    error: AppColor.CHALK_RED,
  },
  Backgrounds: {
    default: AppColor.PURE_BLACK,
    transparentDefault: AppColor.TRANSPARENT,
    complete: AppColor.TREE_BROWN,
    success: AppColor.IVY_GREEN,
    primary: AppColor.CHARCOAL,
    secondary: AppColor.TINTED_GRAY,
    empty: AppColor.STONE_GRAY,
    contrast: AppColor.TREE_BROWN,
    label: AppColor.SANDY_WHITE,
    playback: AppColor.CLEAR_TEAL,
    inputs: AppColor.NEARLY_BLACK,
    error: AppColor.HAT_RED,
    submit: AppColor.TREE_BROWN,
  },
  Buttons: {
    foreground: AppColor.FADED_WHITE,
    background: AppColor.CHARCOAL,
  },
  Gear: {
    inactive: AppColor.TRANSPARENT_WHITE,
    active: AppColor.OLIVE,
  },
  Player: {
    progress: AppColor.TRANSPARENT_HOUSE_BLUE,
    waveform: AppColor.EMPTY_GRAY,
  },
};
const AppLightTheme: Theme = {
  ...AppDarkTheme,
  // Backgrounds: {
  //   ...AppDarkTheme.Backgrounds,
  //   label: AppColor.SLATE,
  //   primary: AppColor.SANDY_WHITE,
  //   playback: AppColor.TRANSPARENT_WHITE,
  //   secondary: AppColor.WARM_WHITE,
  //   inputs: AppColor.SNOW_WHITE,
  //   transparentDefault: AppColor.TRANSPARENT_WHITE,
  //   contrast: AppColor.HOUSE_BLUE,
  //   default: AppColor.SANDY_WHITE,
  //   submit: AppColor.ICY_BLUE,
  // },
  // Text: {
  //   ...AppDarkTheme.Text,
  //   default: AppColor.CHARCOAL,
  //   contrast: AppColor.PURE_WHITE,
  //   subtle: AppColor.STONE_GRAY,
  // },
  // Borders: {
  //   ...AppDarkTheme.Borders,
  //   dramatic: AppColor.CHARCOAL,
  // },
  // Buttons: {
  //   foreground: AppColor.CHARCOAL,
  //   background: AppColor.FADED_WHITE,
  // },
  // Player: {
  //   ...AppDarkTheme.Player,
  //   progress: AppColor.TRANSPARENT_HOUSE_BLUE,
  // },
};

const Colors: ThemeSet = {
  light: AppLightTheme,
  dark: AppDarkTheme,
};

export default Colors;
