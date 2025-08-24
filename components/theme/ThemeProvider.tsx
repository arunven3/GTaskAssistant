import { createTheme } from "flowbite-react";
import { BaseTheme } from "./BaseTheme";
import { GreyThemeCorlor } from "./colors/grey";

export const Theme = createTheme({
  ...BaseTheme,
  ...GreyThemeCorlor,
});
