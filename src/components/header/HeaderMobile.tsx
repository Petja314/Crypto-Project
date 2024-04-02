import React, {useState} from 'react';
import {AppBar, Avatar, BottomNavigation, BottomNavigationAction, Box, Container, InputAdornment, TextField, Toolbar, Typography} from "@mui/material";
import logo from "../../assets/images/logo/logo-dark.svg";
import SearchIcon from "@mui/icons-material/Search";
import {Link} from "react-router-dom";
import LoginSettings from "./LoginSettings";
import {routesNavigation, RoutesNavigationType} from "../../Routes/navigation";
import MobileCoinSearch from "./MobileCoinSearch";

export const MobileHeader = () => {
    const [selectedMenu, setSelectedMenu] = useState<number>(0)

    return (
        < >
            <AppBar position="static">
                <Container
                    maxWidth={"xl"}
                >
                    <Toolbar disableGutters
                             sx={{
                                 display: {xs: "flex"},
                                 justifyContent: {xs: "space-between"}
                             }}
                    >

                        <Box
                            sx={{
                                display: {md: "flex"},
                                alignItems: {md: "center"}
                            }}>
                            <Avatar sx={{marginRight: "20px", width: 50, height: 50}} src={logo}></Avatar>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    mr: 10,
                                    display: {xs: 'none', md: 'flex'},
                                    fontWeight: 600,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                Mi CRYPTO
                            </Typography>
                        </Box>

                        <MobileCoinSearch/>

                        <LoginSettings/>
                    </Toolbar>
                </Container>
            </AppBar>

            {/*BOTTOM NAVIGATION SECTION*/}
            <Box
                sx={{
                    display: {xs: 'flex', md: 'flex'},
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 999,
                }}
            >
                <BottomNavigation
                    value={selectedMenu}
                    onChange={(event, newValue) => {
                        setSelectedMenu(newValue)
                    }}
                    showLabels
                    sx={{
                        width: "100%",
                        height: "100px"
                    }}
                >


                    {routesNavigation &&
                        routesNavigation.map((item: RoutesNavigationType) => (
                            <>
                                {item.isMenu &&
                                    <BottomNavigationAction
                                        label={item.name}
                                        key={item.path}
                                        icon={
                                            <Box
                                                sx={{
                                                    color: "#fff",
                                                    textAlign: "center"
                                                }}>
                                                < item.icon style={{fill: "#fff" ,height : "20px", width : "20px" }}/>
                                                <Box sx={{fontSize : "15px"}} >  {item.name}</Box>
                                            </Box>
                                        }
                                        component={Link}
                                        to={item.path}
                                        sx={{}}
                                    />
                                }

                            </>
                        ))
                    }
                </BottomNavigation>
            </Box>

        </>
    )
}

export default MobileHeader