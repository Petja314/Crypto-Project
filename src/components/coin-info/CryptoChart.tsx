import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {coinChartDataThunk} from "../redux/CoinDescriptionReducer";
import {Box, Paper, Typography} from "@mui/material";
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


export const CryptoChart = ({ priceChangedData,}: any) => {

    const {id} = useParams()
    const {cryptoChartData} = useSelector((state: any) => state.coinDetails)
    const dispatch: any = useDispatch()
    const formattedPrice = (price: any) => {
        return Number(price).toLocaleString('en-US')
    }


    useEffect(() => {
        // console.log('Fetching data...');
        dispatch(coinChartDataThunk(id))
        // console.log('Effect ran due to id change:', id); // Debugging statement
    }, [id]);

    //GETTING THE VALUE X and Y to Display chart by the current price
    const coinCharData = cryptoChartData.map((value: any) => ({
        x: value[0], y: value[1].toFixed(2)
    }))
    const options = {
        responsive: true
    }
    const data: any = {
        labels: coinCharData.map((value: any) => moment(value.x).format('MMM DD')),
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
    // console.log('price24h', priceChangedData)
    return (
        <Box sx={{width: "750px", maxWidth: "100%", marginTop: "50px" }}>
            <Paper sx={{borderRadius: '20px', padding: "30px"}}>
                <Line options={options} data={data}/>
            </Paper>

            <Box sx={{display: "flex", justifyContent: "space-evenly", gap: 5, marginTop: "30px"}}>

                {
                    priceChangedData.map((item: any, index: any) => (
                        <Paper key={index} sx={{borderRadius: '20px', padding: "30px"}}>
                            <Typography sx={{textAlign : "center"}} >{item.name}</Typography>
                            <Box sx={{background: item.price < 0 ? "#F13005" : "#1ABC7B", borderRadius: "5px", padding: "5px", textAlign: "center", marginTop: "30px"}}>
                                {formattedPrice(item.price)}%
                            </Box>
                        </Paper>

                    ))

                }
            </Box>

        </Box>
    )
}
