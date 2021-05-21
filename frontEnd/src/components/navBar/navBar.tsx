import React from "react";
import NavBarDesktop from "./navBarDesktop";
import NavBarPhone from "./navBarPhone";
import { useMediaQuery, useTheme } from "@material-ui/core";

export interface navBarProps {}

const NavBar: React.FC<navBarProps> = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return matches ? <NavBarPhone /> : <NavBarDesktop />;
};

export default NavBar;
