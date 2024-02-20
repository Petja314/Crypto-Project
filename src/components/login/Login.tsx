import React from 'react';
import {Box, Button, Container, Grid, TextField, Typography} from "@mui/material";
import logo from "../../assets/images/logo/logo-dark.svg";
import logoBackground from "../../assets/images/login-img/login-background.svg";
import loginImage from "../../assets/images/login-img/slide3.webp";


const Login = () => {
    return (
        <Container
            disableGutters
            maxWidth={false}
            sx={{
                height: '100vh',
                display: 'flex',
            }}
        >
            <Grid container sx={{flex: 1}}>
                <Grid
                    item
                    xs={6}
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
                        <Typography sx={{color: "#fff"}}> Stay informed with real-time data on cryptocurrency prices, market trends, and portfolio performance. Track your favorite cryptocurrencies,
                            explore market insights, and make informed decisions—all in one convenient place. </Typography>
                    </Box>

                    {/* Content for the left side */}
                </Grid>

                <Grid
                    item
                    xs={6}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Box sx={{maxWidth: "230px", textAlign: "center"}}>
                        <img src={logo} alt=""/>
                        <Typography variant='h5' sx={{color: "#fff", fontWeight: "bold", marginTop: "20px"}}>Start Your Crypto Journey Today</Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: "30px",
                            gap: 2,
                        }}
                    >
                        <TextField
                            label='Login'
                            type='password'
                        />
                        <TextField
                            label='Password'
                            type='password'
                        />

                        <Button>Sign in</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
