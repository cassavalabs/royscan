import { DefaultTheme } from "styled-components";
import { darkPalette } from "./darkPalette";
import { lightPalette } from "./lightPalette";

export const theme = (darkMode: boolean): DefaultTheme => {
  const selectedTheme = darkMode ? darkPalette : lightPalette;

  return {
    ...selectedTheme,
    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },
  };
};
