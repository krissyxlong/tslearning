import React, { useContext } from "react";
import { ThemeContext } from "../hooks/common";
export default () => {
  const theme = useContext(ThemeContext);
  return <span>{theme.foreground}</span>;
};
