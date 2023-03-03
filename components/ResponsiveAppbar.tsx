import { AppBar, Avatar, Box, Button, Container, Grid, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material"
import { MdArrowBack, MdMenu, MdOutlineArrowLeft } from "react-icons/md";
import Image from "next/image"
import { pages } from "./ResponsiveDrawer"
import { useRouter } from "next/router";
import { useJwtTokenData, useTokenExpirationTime } from "../functions/useJwtToken";
import { useRecoilState } from "recoil";
import { jwtToken } from "../recoil/jwtToken";
import { Logout } from "@mui/icons-material";
import { useEffect } from "react";

export interface MyAppbarProps {
  listOpen: boolean,
  setListOpen: (value: boolean) => void,
  drawerShown: boolean
}

export const ResponsiveAppbar = (props: MyAppbarProps) => {
  const { drawerShown, listOpen, setListOpen } = { ...props };
  const router = useRouter();
  const userData = useJwtTokenData();
  const exp = useTokenExpirationTime();
  const [token, setToken] = useRecoilState(jwtToken);

  useEffect(() => {
    if (token === undefined && router.isReady)
      router.push("/");
  }, [token, router.isReady])

  return (
    <AppBar position="fixed" style={{ zIndex: 1201 }}>
      <Container maxWidth={false} disableGutters sx={{ pr: 2, pl: 0.8 }}>
        <Toolbar disableGutters>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs="auto">
              {
                drawerShown ? (
                  listOpen ?
                    <IconButton onClick={() => setListOpen(false)}>
                      <MdArrowBack color="white" />
                    </IconButton>
                    :
                    <IconButton onClick={() => setListOpen(true)}>
                      <MdMenu color="white" />
                    </IconButton>
                ) : undefined
              }
            </Grid>
            <Grid item container xs="auto" justifyContent="space-between"
              alignItems="center">
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignContent: 'center', alignItems: 'center' }}>
                <Image src="/Logo.svg" alt="Carly" width={69} height={24} />
                {
                  router.route === "/" ? undefined : <Typography variant="h6">/&nbsp;</Typography>
                }
              </Box>
            </Grid>
            <Grid item xs="auto" sx={{ pl: 0.5 }}>
              <Typography variant="h6">{pages.filter(x => x !== undefined).find(x => router.route === x?.url ?? "")?.title ?? ""}</Typography>
            </Grid>
            <Grid item xs /> {/* empty filler */}
            <Grid item xs="auto">
              {
                userData === undefined ? undefined : 
                  <Grid
                    container
                    direction="row"
                    gap={1}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Grid container direction="column">
                          <Grid item>
                            <Typography fontWeight="bold">{userData.name} {userData.surname}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography sx={{ fontSize: 10, mt: -0.5 }} align="right">
                              <strong>{userData.email}</strong> - {exp}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Avatar src="/favicon.svg" sx={{ bgcolor: "#00000060" }} >
                        {userData.name[0].toUpperCase()}{userData.surname[0].toUpperCase()}
                      </Avatar>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Logout">
                        <IconButton onClick={() => setToken(undefined)}>
                          <Logout htmlColor="white" />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
              }
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  )
}



export default ResponsiveAppbar