import {Box, Grid, Typography} from "@mui/material";
import loginImage from "../../assets/images/login-img/slide3.webp";
import React from "react";
import styles from "../../css/login/login-container.module.css"


export const LoginInfoSection = () => {
    return (
        <Grid item xs={6} className={styles.gridItemInfoSection}>
            <Box className={styles.loginInfoSection}>
                <img src={loginImage} alt="login_crypto_image"/>
                <Typography variant='h5' className={styles.loginInfoTitle}>
                    Track Value Change Each Digital Currency
                </Typography>
                <Typography className={styles.loginInfoDescription}>
                    Stay informed with real-time data on cryptocurrency prices, market trends, and portfolio performance. Track your favorite cryptocurrencies,explore
                    market insights, and make informed decisions—all in one convenient place.
                </Typography>
            </Box>

        </Grid>
    )
}