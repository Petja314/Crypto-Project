import React from 'react';
import {Box, Container, Typography} from "@mui/material";
import BtcPriceWidget from "../widgets/BtcPriceWidget";
import Performer from "../widgets/Performer";
import PortfolioTable from "./portfolio-table/PortfolioTable";


const PortfolioComponent = () => {
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
                <PortfolioTable/>
            </Container>
        </Box>
    );
};

export default PortfolioComponent;

