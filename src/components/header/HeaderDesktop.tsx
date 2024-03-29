import {AppBar, Avatar, Box, Container, Toolbar, Typography} from "@mui/material";
import logo from "../../assets/images/logo/logo-dark.svg";
import {NavLink, useNavigate} from "react-router-dom";
import React from "react";
import LoginSettings from "./LoginSettings";
import {routesNavigation} from "../../Routes/navigation";


// Quick Description: HeaderDesktop Component
// This component represents the desktop version of the application header.
// It includes a logo section with an onClick event to redirect users to the dashboard.
// RoutesNavigation is displayed based on the isMenu status, controlling the visibility of navigation options.
const HeaderDesktop = () => {
    const navigate = useNavigate()
    return (
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

                    {/*LOGO SECTION*/}
                    <Box
                        onClick={() => navigate("/dashboard")}
                        sx={{
                            display: {md: "flex"},
                            alignItems: {md: "center"}
                        }}>
                        <Avatar sx={{marginRight: "20px", width: 50, height: 50}} src={logo}></Avatar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 10,
                                display: {xs: 'none', md: 'flex'},
                                fontWeight: 600,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            MiCrypto
                        </Typography>
                    </Box>

                    {/*ROUTES SECTION*/}
                    <Box sx={{
                        // border: "2px solid red",
                        flexGrow: 1,
                        display: {xs: 'none', md: 'flex', justifyContent: "flex-start", gap: 80},

                    }}>
                        {routesNavigation &&
                            routesNavigation.map((page: any) => (
                            <NavLink
                                key={page.path}
                                to={page.path}
                                style={{
                                    textDecoration: 'none',
                                    listStyleType: "none",
                                    color: "white",
                                    cursor: "pointer",
                                }}
                            >
                                {page.isMenu &&
                                    <Box sx={{
                                        display: "flex",
                                        gap: 1,
                                        alignItems: "center",
                                    }}>
                                        < page.icon style={{fill: "white", width: 20, height: 20,}}/>
                                        {page.name}
                                    </Box>
                                }

                            </NavLink>
                        ))}
                    </Box>

                    <LoginSettings />
                </Toolbar>
            </Container>
        </AppBar>
    );
}


export default HeaderDesktop