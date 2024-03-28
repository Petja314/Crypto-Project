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
import {RootState} from "../../../redux/ReduxStore";
import {ListSkeleton} from "../../widgets/ListSkeleton";
import styles from "../../../css/coin-info/skeleton-coinInfo.module.css"

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


 const CryptoChart = () => {
    //Variations of different time frames for a crypto chart
    const timeframe: string[] = ["24h", "1w", "1m", "3m", "6m", "1y",]
    const {id} = useParams()

    // CryptoChartData - selected coin data for a chart
    const {cryptoChartData, chartTimeFrame} = useSelector((state: RootState) => state.coinDetails)
    const dispatch: any = useDispatch()

    useEffect(() => {
        // Dispatching the coin id from URL params & selected time frame (as a first render by default is 1 month)
        dispatch(coinChartDataThunk(id, chartTimeFrame))
    }, [id, chartTimeFrame]);

    //GETTING THE VALUE X and Y to Display chart by the current price
    const coinCharData = cryptoChartData.map((value: any) => ({
        x: value[0], y: value[1].toFixed(2)
    }))

    const options: { responsive: boolean } = {
        responsive: true
    }
    //Creating the relevant data for a crypto chart with , selected coin , currency , date and etc.
    const data: any = {
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
                <ListSkeleton columns={1}
                              skeletonClass={styles.skeletonChartTimeFrame}
                              variant={"rectangle"}
                />
            ) : (
                <Paper sx={{borderRadius: '20px', marginBottom: "10px", height: "100px"}}>
                    <Typography sx={{textAlign: "center"}}>Chart time frame</Typography>
                    <List sx={{display: "flex", justifyContent: "space-evenly"}}>
                        {timeframe.map((item: any, index: number) => (
                            <ListItem
                                value={chartTimeFrame}
                                onClick={() => dispatch(coinDescriptionActions.setChartTimeFrameAC(item))}
                                key={index}
                                sx={{
                                    fontWeight: "bold",

                                }}
                            >
                                <ListItemButton
                                    style={{
                                        border: "1px solid #e0f64b",
                                        borderRadius: '5px',
                                        padding: "0",
                                        display: "flex",
                                        justifyContent: "center",
                                        color: item === chartTimeFrame ? "#e0f64b" : "white"
                                    }}
                                >
                                    {item}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                </Paper>
            )
            }


            {data.labels.length <= 0 ? (
                <ListSkeleton columns={1}
                              skeletonClass={styles.skeletonChart}
                              variant={"rectangle"}
                />
            ) : (
                <Paper sx={{borderRadius: '20px', padding: "30px", height: "350px"}}>
                    <Line options={options} data={data}/>
                </Paper>
            )
            }

        </Box>
    )
}


export default React.memo(CryptoChart);

