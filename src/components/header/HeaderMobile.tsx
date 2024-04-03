import React, {useState} from 'react';
import {AppBar, Avatar, BottomNavigation, BottomNavigationAction, Box, Container, InputAdornment, TextField, Toolbar, Typography} from "@mui/material";
import logo from "../../assets/images/logo/logo-dark.svg";
import SearchIcon from "@mui/icons-material/Search";
import {Link, NavLink} from "react-router-dom";
import LoginSettings from "./LoginSettings";
import {routesNavigation, RoutesNavigationType} from "../../Routes/navigation";
import MobileCoinSearch from "./MobileCoinSearch";
import styles from "../../css/header/header.module.css"
import HeaderLogoSection from "./HeaderLogoSection";

export const MobileHeader = () => {
    const [selectedMenu, setSelectedMenu] = useState<number>(0)

    return (
        <>
            <AppBar className={styles.appBar}>
                <Container className={styles.container}>
                    <HeaderLogoSection/>
                    <MobileCoinSearch/>
                    <LoginSettings/>
                </Container>
            </AppBar>

            {/*BOTTOM NAVIGATION SECTION*/}
            <Box className={styles.bottomNavContainer}>
                <BottomNavigation className={styles.bottomNavigation} value={selectedMenu} showLabels
                                  onChange={(event, newValue) => {
                                      setSelectedMenu(newValue)
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
                                            <Box className={styles.bottomNavIconContainer}>
                                                <item.icon className={styles.bottomNavIcon}/>
                                                <Box className={styles.routesNaming}>
                                                    {item.name}
                                                </Box>
                                            </Box>
                                        }
                                        component={Link}
                                        to={item.path}
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
