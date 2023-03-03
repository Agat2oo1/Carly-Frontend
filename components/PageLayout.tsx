import { Box, CssBaseline, Grid, Toolbar, Typography } from "@mui/material"
import { ReactNode, useState } from "react"
import { useRecoilState } from "recoil"
import { drawerWide } from "../recoil/drawerState"
import { HideOnDesktop, HideOnMobile } from "./HideOn"
import ResponsiveAppbar from "./ResponsiveAppbar"
import ResponsiveDrawer from "./ResponsiveDrawer"

export interface PageLayoutProps {
  hideDrawer?: boolean,
  hideAppbar?: boolean,
  children: ReactNode
}

export const PageLayout = (props: PageLayoutProps) => {
  const { hideDrawer, hideAppbar, children } = { ...props };
  const [wideList, setWideList] = useRecoilState(drawerWide);

  return (
    // <>
    //   <CssBaseline />
    //   <MyDrawer />
    //   <Toolbar />
    //   <MyAppbar />
    //   {props.children}
    // </>

    <Box sx={{ display: 'flex', width: "100vw", height: "100vh" }}>
      <CssBaseline />
      {
        hideAppbar ?? false ? undefined :
          <ResponsiveAppbar
            listOpen={wideList}
            setListOpen={setWideList}
            drawerShown={!(hideDrawer ?? false)}
          />
      }
      {
        hideDrawer ?? false ? undefined :
          <ResponsiveDrawer
            open={wideList}
            setOpen={setWideList}
          />
      }
      <Box sx={{ width: "100%" }}>
        <Toolbar />
        {children}
      </Box>
    </Box >
  )
}

export default PageLayout