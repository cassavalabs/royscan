export type Color = string;

export interface Colors {
  white: Color;
  black: Color;
  red100: Color;
  success: Color;
  failure: Color;

  bg100: Color;
  bg200: Color;
  bg300: Color;
  bg400: Color;

  text100: Color;
  text200: Color;
  text300: Color;

  primary100: Color;
  primary200: Color;
  primary300: Color;

  secondary100: Color;
  secondary200: Color;
  secondary300: Color;
}

declare module "styled-components" {
  export interface DefaultTheme extends Colors {
    grids: Grids;
  }
}
