import { createTheme } from "flowbite-react";
import { BaseTheme } from "./BaseTheme";
import { GreyThemeCorlor } from "./colors/grey";

export const Theme = createTheme({
  ...BaseTheme,
  ...GreyThemeCorlor,
});


//git subtree add --prefix=folder/ remote-name <URL to Git repo> subtree-branchname
