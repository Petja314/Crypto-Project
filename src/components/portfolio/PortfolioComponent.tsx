import React, {useEffect, useState} from "react";
import {Box, Button, Container, Grid, Typography} from "@mui/material";
import BtcPriceWidget from "../widgets/BtcPriceWidget";
import Performer from "../widgets/Performer";
import PortfolioTable from "./portfolio-table/PortfolioTable";
import AllocationPortfolioChart from "./portfolio-table/AllocationPortfolioChart";
import {
    fetchPortfolioDataApiFirebase,
    PortfolioActions,
} from "../redux/PortfolioReducer";
import {useDispatch, useSelector} from "react-redux";
import AddTransactionContainer from "./portfolio-table/AddTransactionContainer";

const PortfolioComponent = () => {
    const dispatch: any = useDispatch();

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
                        <BtcPriceWidget/>
                        <Performer/>
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

export default PortfolioComponent;
