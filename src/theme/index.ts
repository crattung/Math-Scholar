import { extendTheme } from "native-base";

/**
 * Trong cac component co the dung useTheme
 */

export const newColorTheme = {
  primary: {
    blue: "#3987B9",
  },
  gradient: {
    secondary: {
      green: {
        color1: "#BFC021",
        color2: "#7A7D00",
      },
      red: {
        color1: "#FF8579",
        color2: "#FF3F54",
      },
      orange: {
        color1: "#FFD21C",
        color2: "#FF9F1F",
      },
    },
    primary: {
      color1: "#FFB3BD",
      color2: "#BF243A",
    },
  },
  text: {
    50: "#FAFAFA",
    0: "#FFF",
    coolGray: "#1F2937",
    primary: "#4CACE9",
    black: "#000",
  },
};

const appTheme = extendTheme({
  colors: newColorTheme,
  fontConfig: {
    Quicksand: {
      300: {
        normal: "Quicksand_300Light",
      },
      400: {
        normal: "Quicksand_400Regular",
      },
      500: {
        normal: "Quicksand_400Regular",
      },
      600: {
        normal: "Quicksand_600SemiBold",
      },
      700: {
        normal: "Quicksand_700Bold",
      },
    },
  },
  fonts: {
    heading: "Quicksand",
    body: "Quicksand",
    mono: "Quicksand",
  },
});

export type AppThemeType = typeof appTheme;
declare module "native-base" {
  interface ICustomTheme extends AppThemeType {}
}
export default appTheme;
