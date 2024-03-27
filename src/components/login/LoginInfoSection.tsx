import {Box, Grid, Typography} from "@mui/material";
import logoBackground from "../../assets/images/login-img/login-background.svg";
import loginImage from "../../assets/images/login-img/slide3.webp";
import React from "react";

export const LoginInfoSection = () => {
    return (
        <Grid item xs={6}
              sx={{
                  backgroundImage: `url(${logoBackground})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: "rgba(255, 255, 255, 0.09)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
              }}
        >
            <Box sx={{maxWidth: "560px"}}>
                <img src={loginImage} alt=""/>
                <Typography variant='h5' sx={{color: "#fff", marginBottom: "20px", marginTop: "20px", fontWeight: "bold"}}> Track Value Change Each Digital Currency </Typography>
                <Typography sx={{color: "#fff"}}> Stay informed with real-time data on cryptocurrency prices, market trends, and portfolio performance. Track your favorite cryptocurrencies,explore
                    market insights, and make informed decisions—all in one convenient place. </Typography>
            </Box>

        </Grid>
    )
}