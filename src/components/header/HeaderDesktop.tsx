import {AppBar, Avatar, Box, Container, Toolbar, Typography} from "@mui/material";
import logo from "../../assets/images/logo/logo-dark.svg";
import {NavLink} from "react-router-dom";
import React from "react";
import LoginSettings from "./LoginSettings";

const HeaderDesktop = ({routes,userLogged }: any) => {
    // console.log('desktop')
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

                    {/*ROUTES SECTION*/}
                    <Box sx={{
                        // border: "2px solid red",
                        flexGrow: 1,
                        display: {xs: 'none', md: 'flex', justifyContent: "flex-start", gap: 80},

                    }}>
                        {routes.map((page: any) => (
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
                                <Box sx={{
                                    display: "flex",
                                    gap: 1,
                                    alignItems: "center",
                                }}>
                                    < page.icon style={{fill: "white", width: 20, height: 20,}}/>
                                    {page.name}
                                </Box>

                            </NavLink>
                        ))}
                    </Box>

                    <LoginSettings userLogged={userLogged}/>
                </Toolbar>
            </Container>
        </AppBar>
    );
}


export default HeaderDesktop