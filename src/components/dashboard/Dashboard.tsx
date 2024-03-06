import React from 'react';
import { Container, Grid, Paper, Stack, Typography} from "@mui/material";
import CryptoTable from "./crypto table/CryptoTable";
import BtcPriceWidget from "../widgets/BtcPriceWidget";
import CarouselMui from "../widgets/CarouselMui";
import LeaderBoard from "../widgets/LeaderBoard";

const Dashboard = () => {
    return (
            <Container sx={{marginBottom: "50px", marginTop : "50px"}}>

                <Typography  variant='h4' sx={{color: "#fff", marginBottom: "50px"}}>🔥Dashboard</Typography>

                <Grid container  >
                    <Grid item xs={6}>
                        <LeaderBoard/>
                    </Grid>
                    <Grid item xs={6}>
                        <CarouselMui/>
                        <BtcPriceWidget/>
                    </Grid>
                </Grid>





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