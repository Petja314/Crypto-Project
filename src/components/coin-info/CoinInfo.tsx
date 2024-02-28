import React, {useEffect, useState} from 'react';
import {Box, Container, Paper, Typography} from "@mui/material";
import {coinGeckoApi} from "../api/CointGeckoApi";
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
import { Line } from 'react-chartjs-2';
import moment from "moment";
import {useParams} from "react-router-dom";
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


const CoinInfo = () => {
    const {id} = useParams()


    const [dataApi,setDataApi] = useState<any>([])
    {/*coinChart*/}

    const callCoinChartApi = async () => {
        let response = await coinGeckoApi.coinChart('bitcoin')
        setDataApi(response.data.prices)
        // console.log('response :' ,  response)
    }
    useEffect(() => {
        callCoinChartApi()
    },[])

    const coinCharData = dataApi.map((value : any) => ({
        x:value[0] , y : value[1].toFixed(2)
    }))
    const options = {
        responsive : true
    }
    const data : any = {
        labels : coinCharData.map((value : any) => moment(value.x).format('MMM DD')),
        datasets : [
            {
                fill : true,
                label : id,
                data : coinCharData.map((value : any) => value.y),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ]
    }

    console.log('coinCharData' , coinCharData)

    return (
            <Container>
                <Typography>Chart</Typography>

                <Paper>
                    <Line options={options} data={data}/>
                </Paper>

            </Container>
    );
};

export default CoinInfo;