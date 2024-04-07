import {AppBar, Box, Container} from "@mui/material";
import {NavLink} from "react-router-dom";
import React from "react";
import LoginSettings from "./LoginSettings";
import {routesNavigation, RoutesNavigationType} from "../../Routes/navigation";
import styles from "../../css/header/header.module.css"
import classNames from 'classnames';
import HeaderLogoSection from "./HeaderLogoSection";

/**
 * Quick Description: HeaderDesktop Component
 * This component represents the desktop version of the application header.
 * It includes a logo section with an onClick event to redirect users to the dashboard.
 * RoutesNavigation is displayed based on the isMenu status, controlling the visibility of navigation options.
 */



// containerDesktop

const HeaderDesktop = () => {
    return (
        <AppBar className={styles.appBar}>
            <Container className={classNames(styles.container,styles.containerDesktop)}>
                <HeaderLogoSection/>
                    {/*ROUTES SECTION*/}
                    <Box className={styles.desktopHeaderRoutesContainer}>
                        {routesNavigation &&
                            routesNavigation.map((page: RoutesNavigationType) => (
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
                                        <Box className={styles.desktopMenuRoutes}>
                                            <page.icon  className={styles.bottomNavIcon}/>
                                            {page.name}
                                        </Box>
                                    }

                                </NavLink>
                            ))}
                    </Box>
                    <LoginSettings />
            </Container>
        </AppBar>
    );
}


export default HeaderDesktop