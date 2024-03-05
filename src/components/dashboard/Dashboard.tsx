import React from 'react';
import { Container, Grid, Paper, Stack, Typography} from "@mui/material";
import CryptoTable from "./crypto table/CryptoTable";
import BtcPriceWidget from "../widgets/BtcPriceWidget";
import CarouselMui from "../widgets/CarouselMui";

const Dashboard = () => {
    return (
            <Container sx={{marginBottom: "50px"}}>

                <Typography
                    variant='h4'
                    sx={{
                        marginTop: "50px",
                        marginBottom: "20px",
                        color: "#fff"
                    }}
                >
                    Dashboard
                </Typography>

                <Typography variant='h6' sx={{color: "#fff", marginBottom: "20px"}}>🔥Cryptocurrency market cap</Typography>

                <Grid container sx={{marginBottom: "60px"}} spacing={2}>
                    <Grid item xs={4}>
                        <CarouselMui/>
                    </Grid>
                    <Grid item xs={4}>
                        <CarouselMui/>
                    </Grid>
                    <Grid item xs={4}>
                        <CarouselMui/>
                    </Grid>
                </Grid>

                <BtcPriceWidget/>
                {/*<LeaderBoard/>*/}
                <CryptoTable/>

                {/*<Grid container  spacing={3}>*/}
                {/*    <Grid item xs={8}>*/}
                {/*        <CryptoTable/>*/}
                {/*    </Grid>*/}

                {/*    <Grid item xs={4}>*/}
                {/*        <LeaderBoard/>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}


            </Container>
    );
};

export default Dashboard;