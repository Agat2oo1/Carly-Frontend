import { Box } from "@mui/material";
import { ReactNode } from "react";

export const HideOnMobile = (props: { children: ReactNode }) =>
  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
    {props.children}
  </Box>


export const HideOnDesktop = (props: { children: ReactNode }) =>
  <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
    {props.children}
  </Box>
