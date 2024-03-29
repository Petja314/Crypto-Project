import React, {useEffect, useState} from "react";
import {Box, Button, Container, Grid, Typography} from "@mui/material";
import PortfolioBalanceWidget from "../widgets/PortfolioBalanceWidget";
import PerformanceAnalyticsWidget from "./analytics-widget-portfolio/PerformanceAnalyticsWidget";
import PortfolioTable from "./portfolio-table/PortfolioTable";
import AllocationPortfolioChart from "./allocation-chart-portfolio/AllocationPortfolioChart";
import {
    fetchPortfolioDataApiFirebase,
    PortfolioActions,
} from "../redux/PortfolioReducer";
import {useDispatch, useSelector} from "react-redux";
import AddTransactionContainer from "./add-crypto-transaction/AddTransactionContainer";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, RootState} from "../redux/ReduxStore";
import ParticleBackgroundAnimation from "../hooks/particle-background/ParticleBackgroundAnimation";

const PortfolioManager = () => {
    const dispatch:  AppDispatch = useDispatch();

    //Fetching portfolio from Firebase database to get the latest data
    useEffect(() => {
        dispatch(fetchPortfolioDataApiFirebase());
    }, []);
    return (
        <Box>

            <Container sx={{marginBottom: "50px", marginTop: "50px"}}>
                <Grid container spacing={2} sx={{margin: "0 auto"}}>
                    <Grid item xs={6}>
                        <Typography variant="h6" sx={{color: "#fff"}} mb={2}>
                            🚀 Current Portfolio
                        </Typography>
                        <Box mb={2}>
                            <AddTransactionContainer/>
                            <Button
                                onClick={() => dispatch(PortfolioActions.isPortfolioDialogOpenAC(true))}>
                                Add Transaction
                            </Button>
                        </Box>
                        <PortfolioBalanceWidget/>
                        <PerformanceAnalyticsWidget/>
                    </Grid>

                    <Grid item xs={6}>
                        <AllocationPortfolioChart/>
                    </Grid>
                </Grid>

                <PortfolioTable/>
            </Container>
        </Box>
    );
};

export default PortfolioManager;
