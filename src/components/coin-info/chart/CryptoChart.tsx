import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {coinChartDataThunk, coinDescriptionActions, cryptoChartDataType} from "../../../redux/CoinDescriptionReducer";
import {Box, List, ListItem, ListItemButton, Paper, Typography} from "@mui/material";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import {Line} from "react-chartjs-2";
import moment from "moment";
import {AppDispatch, RootState} from "../../../redux/ReduxStore";
import {ListSkeleton} from "../../widgets/ListSkeleton";
import skeletonStyles from "../../../css/coin-info/skeleton-coinInfo.module.css"
import styles from "../../../css/coin-info/coin-chart.module.css"


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);


/**
 * CryptoChart Component:
 * Sends the selected coin data to generate a chart, specifying the time frame, currency, and compiling it into the chart by making API calls.
 * Utilizes the ChartJS library for chart creation using selected data from the API.
 */
type chartDataSets = {
    backgroundColor: string
    borderColor: string
    data: string[]
    fill: boolean
    label: string
}

type ChartData = {
    datasets: chartDataSets[]
    labels: string[]
}


const CryptoChart = () => {
    //Variations of different time frames for a crypto chart
    const timeframe: string[] = ["24h", "1w", "1m", "3m", "6m", "1y",]
    const {id} = useParams()

    // CryptoChartData - selected coin data for a chart
    const {cryptoChartData, chartTimeFrame} = useSelector((state: RootState) => state.coinDetails)
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        // Dispatching the coin id from URL params & selected time frame (as a first render by default is 1 month)
        dispatch(coinChartDataThunk(id, chartTimeFrame))
    }, [id, chartTimeFrame]);

    //GETTING THE VALUE X and Y to Display chart by the current price
    const coinCharData = cryptoChartData.map((value: any): { x: string, y: string } => ({
        x: value[0], y: value[1].toFixed(2)
    }))

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },

        },
    };


    //Creating the relevant data for a crypto chart with , selected coin , currency , date and etc.
    const data: ChartData = {
        labels: coinCharData.map((value: any) => moment(value.x * 1000).format('MMM D')),
        datasets: [
            {
                fill: true,
                label: id + ' $', //$ - cannot change different currency by API
                data: coinCharData.map((value: any) => value.y),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ]
    }
    return (
        <Box mt={5}>
            {timeframe.length <= 0 ? (
                <ListSkeleton
                    columns={1}
                    skeletonClass={skeletonStyles.skeletonChartTimeFrame}
                    variant={"rectangle"}
                />
            ) : (
                <Paper className={styles.paperTimeFrame}>
                    <Typography className={styles.timeFrameTitle}>
                        Chart time frame
                    </Typography>
                    <List className={styles.timeFrameListContent}>
                        {timeframe.map((item: string, index: number) => (
                            <ListItem
                                value={chartTimeFrame}
                                onClick={() => dispatch(coinDescriptionActions.setChartTimeFrameAC(item))}
                                key={index}
                            >
                                <ListItemButton className={styles.timeFrameBtn} style={{color: item === chartTimeFrame ? "#e0f64b" : "white"}}>
                                    {item}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                </Paper>
            )
            }


            {data.labels.length <= 0 ? (
                <ListSkeleton
                    columns={1}
                    skeletonClass={skeletonStyles.skeletonChart}
                    variant={"rectangle"}
                />
            ) : (
                <Paper className={styles.paperChart}>
                    <Line options={options} data={data}/>
                </Paper>
            )
            }

        </Box>
    )
}


export default React.memo(CryptoChart);

