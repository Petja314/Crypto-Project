import React from 'react';
import {Box, Container, Grid, Paper, Stack, Typography} from "@mui/material";
import CryptoTable from "./CryptoTable";
import LeaderBoard from "./LeaderBoard";
import CarouselMui from "./CarouselMui";
import QuickActions from "./QuickActions";

const Dashboard = ({usersDb} : any) => {

    console.log('usersDb' , usersDb)

    return (
        <Box>
            <Container
                sx={{marginBottom: "50px"}}
            >

                <Typography
                    variant='h4'
                    sx={{
                        marginTop : "50px",
                        marginBottom : "20px",
                        color : "#fff"
                    }}
                >
                    Dashboard
                </Typography>

                    <Typography variant='h6' sx={{color : "#fff" , marginBottom : "20px"}}>🔥Cryptocurrency market cap</Typography>

                    <Grid container  sx={{marginBottom : "60px"}}  spacing={2}>
                        <Grid item xs={4} >
                            <CarouselMui/>
                        </Grid>
                        <Grid item xs={4}>
                            <CarouselMui/>
                        </Grid>
                        <Grid item xs={4}>
                            <CarouselMui/>
                        </Grid>
                    </Grid>


                    <Grid container  spacing={3}>
                        <Grid item xs={8}>
                            <CryptoTable/>
                        </Grid>

                        <Grid item xs={4}>
                            <LeaderBoard/>
                        </Grid>
                    </Grid>


            </Container>
        </Box>
    );
};

export default Dashboard;