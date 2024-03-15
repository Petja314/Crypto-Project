import React from 'react';
import {Box, CircularProgress, Paper, Typography} from "@mui/material";
import {Doughnut} from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
import {useSelector} from "react-redux";
import {formattedPrice} from "../../../commons/functions/formattedPrice";
import {TypingEffects} from "../../../utils/TypingEffects";
import {RootState} from "../../redux/ReduxStore";
import {portfolioFirebaseDataType} from "../../redux/PortfolioReducer";
Chart.register(ArcElement);

type AllocationType = {
            "coin": string,
            "allocation": number
}
const AllocationPortfolioChart = () => {
    const {myCurrentPortfolioDataFB} = useSelector((state: RootState) => state.myPortfolio)
    //Calculation total sum of current portfolio
    const totalPortfolioValue = myCurrentPortfolioDataFB.reduce((accum: number, value: portfolioFirebaseDataType) => accum + value.totalHoldingCoinAmountCash, 0)
    // Calculating the allocation percentage for each coin
    const allocations = myCurrentPortfolioDataFB.map((coin : portfolioFirebaseDataType) => ({
        coin: coin.name,
        allocation: (coin.totalHoldingCoinAmountCash / totalPortfolioValue) * 100
    }))

    const data = {
        labels: allocations.map((item: AllocationType) =>
            `${item.coin} ${formattedPrice(item.allocation)}%`),
        datasets: [
            {
                label: '% of Portfolio',
                data: allocations.map((item: AllocationType) => item.allocation),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        plugins: {
            legend: {
                position: 'right' as 'right',
                align: 'center' as 'center',// Aligns the labels to the start of the legend
                marginRight: "20px",
            }
        }
    };

    return (
        <Box>
            <Paper
                sx={{width: "550px", height: "400px", borderRadius: "20px", position: "relative",}}
            >
                <Typography
                    sx={{position: "absolute", top: "40px", left: "20px"}}
                    variant={'h5'}>
                    Portfolio
                    Allocation
                </Typography>

                <Box sx={{margin: "0 auto", width: "370px", height: "370px"}}>
                    {allocations.length > 0 ? (
                        <Doughnut data={data} options={options}/>
                    ) : (
                        <Box sx={{ marginTop : "30%", display : "flex", justifyContent : "center",}}>
                            <CircularProgress sx={{width: "130px !important", height: "130px !important",}} />
                        </Box>
                    )}
                </Box>


                <Typography sx={{bottom: "0", position: "absolute", fontSize: "14px", padding: "15px", color: "#a29393", width: "300px"}}>
                    <TypingEffects
                        speed={20}
                        text={"Crypto portfolio allocation: Spreading investments across different cryptocurrencies to achieve financial goals."}
                        // while managing the risk associated with the volatile nature of the crypto market
                    />
                </Typography>
            </Paper>
        </Box>
    );
};

export default AllocationPortfolioChart;