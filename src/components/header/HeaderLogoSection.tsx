import React from 'react';
import {Avatar, Box, Toolbar, Typography} from "@mui/material";
import logo from "../../assets/images/logo/logo-dark.svg";
import styles from "../../css/header/header.module.css"
import {NavigateFunction, useNavigate} from "react-router-dom";


const HeaderLogoSection = () => {
    const navigate : NavigateFunction = useNavigate()
    return (
        <div>
            <Toolbar disableGutters className={styles.toolbarContainer}>
                <Box className={styles.logoSection} onClick={() => navigate("/dashboard")}>
                    <Avatar className={styles.logoAvatar} src={logo}></Avatar>
                    <Typography variant="h6" noWrap component="a" href="#app-bar-with-responsive-menu" className={styles.logoTitle}>
                        MiCrypto
                    </Typography>
                </Box>
            </Toolbar>
        </div>
    );
};

export default HeaderLogoSection;