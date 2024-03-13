import React, {useEffect} from 'react';
import {Box, Container, Typography} from "@mui/material";
import BtcPriceWidget from "../widgets/BtcPriceWidget";
import Performer from "../widgets/Performer";
import PortfolioTable from "./portfolio-table/PortfolioTable";
import AllocationPortfolioChart from "./portfolio-table/AllocationPortfolioChart";
import {fetchPortfolioDataApiFirebase} from "../redux/PortfolioReducer";
import {useDispatch} from "react-redux";


const PortfolioComponent = () => {
    const dispatch: any = useDispatch()

    useEffect(() => {
        dispatch(fetchPortfolioDataApiFirebase())
    }, [])

    return (
        <Box>
            <Container sx={{marginBottom: "50px"}}>
                <Typography variant='h4'
                            sx={{
                                marginTop: "50px",
                                marginBottom: "20px",
                                color: "#fff"
                            }}
                >
                    Portfolio
                </Typography>


                <BtcPriceWidget/>
                <Performer/>
                <AllocationPortfolioChart

                />
                <PortfolioTable/>
            </Container>
        </Box>
    );
};

export default PortfolioComponent;

