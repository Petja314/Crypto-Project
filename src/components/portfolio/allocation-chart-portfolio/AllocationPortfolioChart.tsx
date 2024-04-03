import React from 'react';
import styles from "../../../css/widgets/allocation-chart.module.css"
import {Box, CircularProgress, Paper, Typography} from "@mui/material";
import {Doughnut} from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
import {useSelector} from "react-redux";
import {TypingEffects} from "../../../utils/TypingEffects";
import {RootState} from "../../../redux/ReduxStore";
import {portfolioFirebaseDataType} from "../../../redux/PortfolioReducer";
import {formatPercent} from "../../../commons/functions/percentFormatter";

Chart.register(ArcElement);

type AllocationType = {
    "coin": string,
    "allocation": number
}
/**
 * AllocationPortfolioChart Component:
 * Displays a doughnut chart illustrating the allocation of assets within the user's investment portfolio.
 * Features:
 * - Calculates the allocation percentage for each cryptocurrency based on its total holding amount.
 * - Presents the data in a visually appealing doughnut chart.
 * - Provides information on the distribution of investments across different cryptocurrencies.
 */


const AllocationPortfolioChart = () => {
    const {myCurrentPortfolioDataFB} = useSelector((state: RootState) => state.myPortfolio)
    //Calculation total sum of current portfolio
    const totalPortfolioValue = myCurrentPortfolioDataFB.reduce((accum: number, value: portfolioFirebaseDataType) => accum + value.totalHoldingCoinAmountCash, 0)
    // Calculating the allocation percentage for each coin
    const allocations = myCurrentPortfolioDataFB.map((coin: portfolioFirebaseDataType) => ({
        coin: coin.name,
        allocation: (coin.totalHoldingCoinAmountCash / totalPortfolioValue) * 100
    }))

    const data = {
        labels: allocations.map((item: AllocationType) =>
            `${item.coin} ${formatPercent(item.allocation)}`),
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
            <Paper className={styles.paperAllocationChart}>
                <Typography variant={'h5'}>
                    Portfolio Allocation
                </Typography>

                <Box className={styles.allocationChartContent}>
                    {allocations.length > 0 ? (
                        <Doughnut
                            data={data}
                            options={options}
                        />
                    ) : (
                        <Box className={styles.chartLoaderBox}>
                            <CircularProgress className={styles.chartPreloader}/>
                        </Box>
                    )}
                </Box>

                <Typography className={styles.chartDescription}>
                    <TypingEffects
                        speed={20}
                        text={"Crypto portfolio allocation: Spreading investments across different cryptocurrencies to achieve financial goals."}
                    />
                </Typography>

            </Paper>
        </Box>
    );
};

export default React.memo(AllocationPortfolioChart);
