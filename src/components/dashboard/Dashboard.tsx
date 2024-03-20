import React from 'react';
import { Container, Grid, Paper, Stack, Typography} from "@mui/material";
import CryptoTable from "./crypto table/CryptoTable";
import PortfolioBalanceWidget from "../widgets/PortfolioBalanceWidget";
import CarouselMui from "../widgets/CarouselMui";
import LeaderBoard from "../widgets/LeaderBoard";
import FearGreedIndex from "../widgets/FearGreedIndex";
import ParticleBackgroundAnimation from "../hooks/particle-background/ParticleBackgroundAnimation";

const Dashboard = () => {
    return (
            <Container sx={{marginBottom: "50px", marginTop : "50px"}}>


                <Typography  variant='h4' sx={{color: "#fff", marginBottom: "50px"}}>🔥Dashboard</Typography>

                <Grid container mb={2} >
                    <Grid item xs={6}>
                        <LeaderBoard/>
                    </Grid>
                    <Grid item xs={6}>
                        <FearGreedIndex/>
                        <CarouselMui/>
                        <PortfolioBalanceWidget/>
                    </Grid>
                </Grid>

                <CryptoTable/>


            </Container>
    );
};

export default Dashboard;