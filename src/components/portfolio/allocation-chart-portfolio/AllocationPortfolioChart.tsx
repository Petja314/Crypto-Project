import React from 'react';
import {Box, Paper, Typography} from "@mui/material";
import {Doughnut} from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
import {useSelector} from "react-redux";
import {formattedPrice} from "../../../commons/functions/formattedPrice";
import {TypingEffects} from "../../../utils/TypingEffects";

Chart.register(ArcElement);

const AllocationPortfolioChart = () => {
    const {myCurrentPortfolioDataFB} = useSelector((state: any) => state.myPortfolio)
    const totalPortfolioValue = myCurrentPortfolioDataFB.reduce((accum: any, value: any) => accum + value.totalHoldingCoinAmountCash, 0)
    // console.log('totalPortfolioValue', formattedPrice(totalPortfolioValue))

    // Calculating the allocation percentage for each coin
    const allocations = myCurrentPortfolioDataFB.map((coin: any) => ({
        coin: coin.name,
        allocation: (coin.totalHoldingCoinAmountCash / totalPortfolioValue) * 100
    }))

    // console.log('allocations' , allocations)

    const data = {
        labels: allocations.map((item: any) =>
            `${item.coin} ${formattedPrice(item.allocation)}%`),
        datasets: [
            {
                label: '% of Portfolio',
                data: allocations.map((item: any) => item.allocation),
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

    // console.log('myCurrentPortfolioDataFB', myCurrentPortfolioDataFB)
    return (
        <Box>
            <Paper
                // sx={{borderRadius: "20px", position: "relative"}}
                sx={{width: "550px", height: "400px", borderRadius: "20px", position: "relative"}}
            >
                <Typography
                    sx={{position: "absolute", top: "40px", left: "20px"}}
                    variant={'h5'}>
                    Portfolio
                    Allocation
                </Typography>

                <Box sx={{ margin : "0 auto" , width : "400px" , height : "400px"}}>
                    <Doughnut data={data} options={options}/>
                </Box>


                <Typography sx={{bottom: "0", position: "absolute", fontSize: "14px", padding: "15px", color: "#a29393"}}>
                    <TypingEffects
                        speed={20}
                        text={"Crypto portfolio allocation: Spreading investments across different cryptocurrencies to achieve financial goals while managing the risk associated with the volatile nature of the crypto market."}
                    />
                </Typography>
            </Paper>
        </Box>
    );
};

export default AllocationPortfolioChart;