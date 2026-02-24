import { createTheme } from "flowbite-react";
import { BaseTheme } from "./BaseTheme";
import { GreyThemeCorlor } from "./colors/grey";
import { IndigoThemeCorlor } from "./colors/indigo";

export const Theme = createTheme({
  ...BaseTheme,
  ...IndigoThemeCorlor,
});
