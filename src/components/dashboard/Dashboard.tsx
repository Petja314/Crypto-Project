import React from 'react';
import {Container, Grid, Typography} from "@mui/material";
import CryptoTable from "./crypto table/CryptoTable";
import PortfolioBalanceWidget from "../widgets/PortfolioBalanceWidget";
import CarouselMui from "../widgets/CarouselMui";
import LeaderBoard from "../widgets/LeaderBoard";
import FearGreedIndex from "../widgets/FearGreedIndex";


/**
 * The Dashboard component represents the main dashboard view of the application.
 * The dashboard includes:
 *  - Leaderboard               :   Displays the top performers or leaders in the portfolio.
 *  - FearGreedIndex            :   Shows the current market sentiment based on the Fear and Greed Index.
 *  - Carousel                  :   Displays a carousel of trending , worst and best performers of the market.
 *  - Portfolio Balance Widget  :   Provides an overview of the user's portfolio balance.
 *  - Crypto Table              :   Presents a table of cryptocurrency data, such as prices, market cap, etc.
 */
const Dashboard = () => {
    return (
        <Container sx={{marginBottom: "100px", marginTop: "50px"}}>
            <Typography variant='h4' sx={{color: "#fff", marginBottom: "50px"}}>🔥Dashboard</Typography>

            <Grid container mb={2} spacing={2} >
                <Grid item md={6} xs={12} >
                    <LeaderBoard/>
                </Grid>
                <Grid item md={6} xs={12}  >
                    <FearGreedIndex/>
                    <CarouselMui/>
                    <PortfolioBalanceWidget/>
                </Grid>
            </Grid>

            <CryptoTable/>
        </Container>
    );
};

export default React.memo(Dashboard);

