import React, {useState} from 'react';
import {AppBar, Avatar, BottomNavigation, BottomNavigationAction, Box, Container, InputAdornment, TextField, Toolbar, Typography} from "@mui/material";
import logo from "../../assets/images/logo/logo-dark.svg";
import SearchIcon from "@mui/icons-material/Search";
import {Link} from "react-router-dom";
import LoginSettings from "./LoginSettings";
import {routesNavigation} from "../../Routes/navigation";

export const MobileHeader = () => {
    const [selectedMenu, setSelectedMenu] = useState<any>(0)

    return (
        <>
            <AppBar position="static">
                <Container
                    maxWidth={"xl"}
                >
                    <Toolbar disableGutters
                             sx={{
                                 display: {xs: "flex"},
                                 justifyContent: {xs: "space-between"}
                                 // display : {xs : "none", md : "flex"}
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


                        {/*TEXT AREA FIND SECTION*/}
                        <Box
                            sx={{
                                width: "100%"
                            }}
                        >
                            <TextField
                                size="small"
                                label='search'
                                type='text'
                                sx={{
                                    display: {xs: "flex", md: "none"},
                                    cursor: "pointer",
                                    [`& fieldset`]: {
                                        borderRadius: 30,

                                    }
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>

                        <LoginSettings/>
                    </Toolbar>
                </Container>
            </AppBar>

            {/*BOTTOM NAVIGATION SECTION*/}
            <Box
                sx={{
                    border: "1px solid red",
                    display: {xs: 'flex', md: 'flex'},
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
                        position: "absolute",
                        bottom: 0,
                        marginBottom: "20px",
                        borderTop: "2px solid #333",
                        paddingTop: "50px",
                        paddingBottom: "30px",
                    }}
                >


                    {routesNavigation &&
                        routesNavigation.map((item: any) => (
                            <>
                                {item.isMenu &&
                                    <BottomNavigationAction
                                        label={item.name}
                                        key={item.path}
                                        icon={
                                            <Box
                                                sx={{
                                                    marginBottom: "10px",
                                                }}>
                                                < item.icon style={{fill: "white"}}/>
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