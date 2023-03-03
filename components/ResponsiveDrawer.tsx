import { Box, Collapse, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Toolbar, Typography, useMediaQuery } from "@mui/material"
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { MdAddCircleOutline, MdCarRepair, MdDirectionsCar, MdCalendarToday, MdPerson, MdBlock, MdSettings, MdHome } from "react-icons/md";
import { IconColor } from "../functions/Icon";
import { HideOnDesktop, HideOnMobile } from "./HideOn";

// undefined is translated to a Divider.
interface Page {
  title: string,
  icon: (arg: string) => JSX.Element,
  url: string
}

export const pages: (Page | undefined)[] = [
  {
    title: "Main page",
    icon: IconColor(MdHome, { size: 20 }),
    url: "/home"
  },
  undefined,
  {
    title: "All cars",
    icon: IconColor(MdDirectionsCar, { size: 20 }),
    url: "/cars"
  },
  {
    title: "Add new car...",
    icon: IconColor(MdAddCircleOutline, { size: 20 }),
    url: "/cars/new"
  },
  undefined,
  {
    title: "Reservations",
    icon: IconColor(MdCalendarToday, { size: 20 }),
    url: "/reservations"
  },
  undefined,
  {
    title: "Customers",
    icon: IconColor(MdPerson, { size: 20 }),
    url: "/customers"
  },
  {
    title: "Blocked customers",
    icon: IconColor(MdBlock, { size: 20 }),
    url: "/blocked"
  },
  undefined,
  {
    title: "Settings",
    icon: IconColor(MdSettings, { size: 20 }),
    url: "/settings"
  },
  undefined
]

// Later, I want to create something like "Mini variant drawer"
// from https://mui.com/material-ui/react-drawer/
export const ResponsiveDrawer = (props: { open: boolean, setOpen: (arg: boolean) => void }) => {
  const { open, setOpen } = { ...props };
  const isDesktop = useMediaQuery('(min-width:900px');

  return <>
    <HideOnMobile>
      <DesktopDrawer open={open} />
    </HideOnMobile>
    <HideOnDesktop>
      <MobileDrawer open={open && !isDesktop} setOpen={setOpen} />
    </HideOnDesktop>
  </>
}

export const MobileDrawer = (props: { open: boolean, setOpen: (arg: boolean) => void }) => {
  const { open, setOpen } = { ...props };

  return (
    <SwipeableDrawer
      anchor='left'
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <DrawerList open={true} />
    </SwipeableDrawer>
  )
}

export const DesktopDrawer = (props: { open: boolean }) => {
  const { open } = { ...props };

  return (
    <Box sx={{ borderRight: "1px solid #ccc", height: "100%" }}>
      <>
        <DrawerList open={open} />
      </>
    </Box >
  )
}

export const DrawerList = (props: { open: boolean }) => {
  const { open } = { ...props };
  const router = useRouter();

  return (
    <>
      <Toolbar />
      <List sx={{ p: 0 }}>
        {
          pages.map((page, index) => (
            page === undefined ?
              <Divider key={"Divider" + index} />
              :
              <ListItem key={page.title} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{ minHeight: 48 }}
                  onClick={() => {
                    if (!(router.route === page.url))
                      router.push(page.url);
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0 }} >
                    {page.icon(router.route === page.url ? "#4F7Aff" : "#494331")}
                  </ListItemIcon>
                  <Collapse
                    orientation="horizontal"
                    in={open}
                    sx={{ w: "100%" }}
                  >
                    <ListItemText
                      primary={router.route === page.url ? <strong>{page.title}</strong> : page.title}
                      sx={{ whiteSpace: "nowrap", ml: 2, w: "100%", color: router.route === page.url ? "#4F7Aff" : "#494331" }}
                    />
                  </Collapse>
                </ListItemButton>
              </ListItem>
          ))
        }
      </List>
    </>
  )
}

export default ResponsiveDrawer