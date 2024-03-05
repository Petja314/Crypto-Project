import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {coinChartDataThunk} from "../../redux/CoinDescriptionReducer";
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
import {Home, KeyboardArrowRight} from "@mui/icons-material";

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

export const CryptoChart = () => {
    const timeframe = ["24h", "1w", "1m", "3m", "6m", "1y"]

    const {id} = useParams()
    const {cryptoChartData} = useSelector((state: any) => state.coinDetails)
    const dispatch: any = useDispatch()
    const [timeValue, setTimeValue] = useState<any>("1m")

    useEffect(() => {
        console.log('call')
        dispatch(coinChartDataThunk(id ,timeValue ))
    }, [id,timeValue]);


    //GETTING THE VALUE X and Y to Display chart by the current price
    const coinCharData = cryptoChartData.map((value: any) => ({
        x: value[0], y: value[1].toFixed(2)
    }))
    const options = {
        responsive: true
    }
    const data: any = {
        labels: coinCharData.map((value: any) => moment(value.x * 1000).format('MMM D')),
        datasets: [
            {
                fill: true,
                label: id,
                data: coinCharData.map((value: any) => value.y),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ]
    }
    return (
        <Box mt={5}>
            <Paper sx={{borderRadius: '20px', marginBottom: "10px"}}>
                <Typography sx={{textAlign : "center"}}>Chart time frame</Typography>
                <List sx={{ display: "flex", justifyContent: "space-evenly" }}>
                    {timeframe.map((item) => (
                        <ListItem
                            value={timeValue}
                            onClick={() => setTimeValue(item)}
                            key={item}
                            sx={{ fontWeight: "bold",

                            }}
                        >
                            <ListItemButton
                                // value={timeValue}
                                style={{
                                    border: "1px solid #e0f64b",
                                    borderRadius: '5px',
                                    padding: "0",
                                    display: "flex",
                                    justifyContent: "center",
                                    color : item === timeValue ? "#e0f64b" : "white"
                                }}
                            >
                                {item}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

            </Paper>

            <Paper sx={{borderRadius: '20px', padding: "30px"}}>
                <Line options={options} data={data}/>
            </Paper>
        </Box>
    )
}
