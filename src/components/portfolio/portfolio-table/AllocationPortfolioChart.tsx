import React from 'react';
import {Box, Paper} from "@mui/material";
import {Doughnut} from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
import {useSelector} from "react-redux";
import {formattedPrice} from "../../../commons/functions/formattedPrice";

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

    console.log('allocations' , allocations)

    const data = {
        labels: allocations.map((item: any) =>
            `${item.coin } ${ formattedPrice(item.allocation)}%`),
        datasets: [
            {
                label: '% of Portfolio',
                data: allocations.map((item: any) => item.allocation),
                // data: [5000, 2000, 1000, 2300, 2000, 300],
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

    console.log('myCurrentPortfolioDataFB', myCurrentPortfolioDataFB)
    return (
        <Box>
            <Paper sx={{width: "300px", height: "300px" , border : "1px solid red"}}>
                <Doughnut  style={{display : "inline-flex" , justifyContent : "space-between" , border : "1px solid red"}} data={data}/>
            </Paper>
        </Box>
    );
};

export default AllocationPortfolioChart;